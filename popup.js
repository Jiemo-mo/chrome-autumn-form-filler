const STORAGE_KEY = "autumnApplyProfile";
const PROFILES_KEY = "autumnApplyProfiles";
const ACTIVE_PROFILE_KEY = "autumnApplyActiveProfileId";
const DEFAULT_PROFILE_ID = "default";

const sections = [
  {
    key: "basic",
    title: "基础信息",
    type: "object",
    fields: [
      ["name", "姓名"], ["gender", "性别"], ["birthDate", "出生日期"], ["ethnicity", "民族"],
      ["phone", "手机号"], ["email", "邮箱"], ["wechat", "微信"], ["politicalStatus", "政治面貌"],
      ["idNumber", "身份证号"], ["currentCity", "当前城市"], ["hukou", "户籍"], ["address", "现居地址"],
      ["jobTarget", "求职意向"], ["expectedCity", "期望城市"], ["expectedSalary", "期望薪资"]
    ]
  },
  {
    key: "education",
    title: "教育经历",
    type: "array",
    fields: [
      ["school", "学校"], ["degree", "学历"], ["major", "专业"], ["college", "学院"],
      ["startDate", "入学时间"], ["endDate", "毕业时间"], ["gpa", "GPA"], ["rank", "排名"],
      ["courses", "主修课程"]
    ]
  },
  {
    key: "internships",
    title: "实习经历",
    type: "array",
    fields: [
      ["company", "公司"], ["department", "部门"], ["position", "岗位"],
      ["startDate", "开始时间"], ["endDate", "结束时间"], ["city", "城市"],
      ["description", "工作内容"]
    ]
  },
  {
    key: "projects",
    title: "项目经历",
    type: "array",
    fields: [
      ["name", "项目名称"], ["role", "角色"], ["startDate", "开始时间"], ["endDate", "结束时间"],
      ["techStack", "技术栈"], ["description", "项目描述"], ["result", "项目成果"]
    ]
  },
  {
    key: "awards",
    title: "获奖证书",
    type: "array",
    fields: [
      ["name", "名称"], ["level", "级别"], ["date", "获得时间"], ["issuer", "颁发机构"], ["description", "说明"]
    ]
  },
  {
    key: "family",
    title: "家庭成员",
    type: "array",
    fields: [
      ["relation", "关系"], ["name", "姓名"], ["phone", "联系电话"], ["workplace", "工作单位"], ["position", "职务"]
    ]
  },
  {
    key: "self",
    title: "自我评价",
    type: "object",
    fields: [["summary", "自我评价"], ["strengths", "个人优势"], ["careerPlan", "职业规划"]]
  }
];

let profile = createDefaultProfile();
let profileVersions = [];
let activeProfileId = DEFAULT_PROFILE_ID;
let saveTimer = 0;

document.addEventListener("DOMContentLoaded", init);

async function init() {
  render();
  const stored = await chrome.storage.local.get([STORAGE_KEY, PROFILES_KEY, ACTIVE_PROFILE_KEY]);
  profileVersions = normalizeProfileVersions(stored[PROFILES_KEY], stored[STORAGE_KEY]);
  activeProfileId = stored[ACTIVE_PROFILE_KEY] || profileVersions[0].id;
  profile = loadActiveProfile();
  render();
  renderProfileSelect();
  bindActions();
  setStatus("已加载本机资料");
}

function createDefaultProfile() {
  const data = {};
  for (const section of sections) {
    if (section.type === "array") {
      data[section.key] = [emptyRecord(section)];
    } else {
      data[section.key] = emptyRecord(section);
    }
  }
  return data;
}

function emptyRecord(section) {
  return Object.fromEntries(section.fields.map(([key]) => [key, ""]));
}

function mergeProfile(base, incoming) {
  for (const section of sections) {
    if (section.type === "array") {
      const rows = Array.isArray(incoming[section.key]) ? incoming[section.key] : [];
      base[section.key] = rows.length ? rows.map(row => ({ ...emptyRecord(section), ...row })) : [emptyRecord(section)];
    } else {
      base[section.key] = { ...base[section.key], ...(incoming[section.key] || {}) };
    }
  }
  return base;
}

function normalizeProfileVersions(storedVersions, legacyProfile) {
  const versions = Array.isArray(storedVersions) ? storedVersions : [];
  const normalized = versions
    .filter(item => item && item.id && item.name && item.profile)
    .map(item => ({
      id: String(item.id),
      name: String(item.name),
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
      profile: mergeProfile(createDefaultProfile(), item.profile)
    }));

  if (!normalized.length) {
    normalized.push({
      id: DEFAULT_PROFILE_ID,
      name: "默认资料",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: mergeProfile(createDefaultProfile(), legacyProfile || {})
    });
  }
  return normalized;
}

function loadActiveProfile() {
  const version = profileVersions.find(item => item.id === activeProfileId) || profileVersions[0];
  activeProfileId = version.id;
  return mergeProfile(createDefaultProfile(), version.profile);
}

function syncActiveProfile() {
  const version = profileVersions.find(item => item.id === activeProfileId);
  if (!version) return;
  version.profile = mergeProfile(createDefaultProfile(), profile);
  version.updatedAt = new Date().toISOString();
}

function renderProfileSelect() {
  const select = document.getElementById("profileSelect");
  if (!select) return;
  select.textContent = "";
  for (const version of profileVersions) {
    const option = document.createElement("option");
    option.value = version.id;
    option.textContent = version.name;
    option.selected = version.id === activeProfileId;
    select.append(option);
  }
  const nameInput = document.getElementById("profileNameInput");
  if (nameInput) nameInput.value = getActiveProfileName();
}

function render() {
  const root = document.getElementById("sections");
  root.textContent = "";

  for (const section of sections) {
    const details = document.createElement("details");
    details.className = "section";
    details.open = true;

    const summary = document.createElement("summary");
    summary.textContent = section.title;
    details.append(summary);

    const body = document.createElement("div");
    body.className = "body";

    if (section.type === "array") {
      profile[section.key].forEach((record, index) => {
        body.append(renderRecord(section, record, index));
      });
      const add = document.createElement("button");
      add.type = "button";
      add.className = "mini";
      add.textContent = `新增${section.title}`;
      add.addEventListener("click", () => {
        profile[section.key].push(emptyRecord(section));
        render();
        queueSave();
      });
      body.append(add);
    } else {
      const grid = document.createElement("div");
      grid.className = "grid";
      for (const field of section.fields) grid.append(renderInput(section.key, field, profile[section.key]));
      body.append(grid);
    }

    details.append(body);
    root.append(details);
  }
}

function renderRecord(section, record, index) {
  const wrap = document.createElement("div");
  wrap.className = "record";

  const head = document.createElement("div");
  head.className = "record-head";
  head.append(document.createTextNode(`${section.title} ${index + 1}`));

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "mini danger";
  remove.textContent = "删除";
  remove.disabled = profile[section.key].length === 1;
  remove.addEventListener("click", () => {
    profile[section.key].splice(index, 1);
    render();
    queueSave();
  });
  head.append(remove);
  wrap.append(head);

  const grid = document.createElement("div");
  grid.className = "grid";
  for (const field of section.fields) grid.append(renderInput(section.key, field, record, index));
  wrap.append(grid);
  return wrap;
}

function renderInput(sectionKey, [key, label], target, index) {
  const nodeLabel = document.createElement("label");
  const id = `${sectionKey}-${index ?? "single"}-${key}`;
  nodeLabel.htmlFor = id;
  nodeLabel.textContent = label;

  const isLong = ["description", "summary", "strengths", "careerPlan", "courses", "result", "address"].includes(key);
  const input = document.createElement(isLong ? "textarea" : "input");
  input.id = id;
  input.dataset.section = sectionKey;
  input.dataset.key = key;
  if (index !== undefined) input.dataset.index = String(index);
  input.value = target[key] || "";
  input.addEventListener("input", onInput);
  nodeLabel.append(input);

  if (isLong) nodeLabel.classList.add("full");
  return nodeLabel;
}

function onInput(event) {
  const { section, key, index } = event.target.dataset;
  if (index === undefined) {
    profile[section][key] = event.target.value;
  } else {
    profile[section][Number(index)][key] = event.target.value;
  }
  queueSave();
}

function queueSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveNow, 250);
}

async function saveNow() {
  // 隐私设计点：敏感资料只写入 chrome.storage.local，避免跨账号云同步。
  syncActiveProfile();
  await chrome.storage.local.set({
    [STORAGE_KEY]: profile,
    [PROFILES_KEY]: profileVersions,
    [ACTIVE_PROFILE_KEY]: activeProfileId
  });
  setStatus("已保存到本机", "ok");
}

function bindActions() {
  document.getElementById("profileSelect").addEventListener("change", switchProfileVersion);
  document.getElementById("profileNameInput").addEventListener("input", renameActiveProfileVersion);
  document.getElementById("deleteProfileBtn").addEventListener("click", deleteCurrentProfileVersion);
  document.getElementById("sidebarBtn").addEventListener("click", openAssistantSidebar);
  document.getElementById("fillBtn").addEventListener("click", fillCurrentPage);
  document.getElementById("resumeFiles").addEventListener("change", importResumeFiles);
  document.getElementById("exportBtn").addEventListener("click", exportJson);
  document.getElementById("importFile").addEventListener("change", importJson);
  document.getElementById("clearBtn").addEventListener("click", clearProfile);
}

async function switchProfileVersion(event) {
  await saveNow();
  activeProfileId = event.target.value;
  profile = loadActiveProfile();
  render();
  renderProfileSelect();
  await saveNow();
  setStatus(`已切换到：${getActiveProfileName()}`, "ok");
}

function renameActiveProfileVersion(event) {
  const version = profileVersions.find(item => item.id === activeProfileId);
  if (!version) return;
  version.name = event.target.value.trim() || "未命名资料";
  version.updatedAt = new Date().toISOString();
  const option = [...document.getElementById("profileSelect").options].find(item => item.value === activeProfileId);
  if (option) option.textContent = version.name;
  queueSave();
}

async function deleteCurrentProfileVersion() {
  if (profileVersions.length <= 1) {
    setStatus("至少保留一个资料版本。", "err");
    return;
  }
  const name = getActiveProfileName();
  if (!confirm(`确认删除资料版本“${name}”？`)) return;
  profileVersions = profileVersions.filter(item => item.id !== activeProfileId);
  activeProfileId = profileVersions[0].id;
  profile = loadActiveProfile();
  render();
  renderProfileSelect();
  await saveNow();
  setStatus(`已删除：${name}`, "ok");
}

async function openAssistantSidebar() {
  await saveNow();
  const tab = await getActiveHttpTab();
  if (!tab) return;

  // 风控设计点：侧边栏只是展示本地资料，单字段填充仍需用户先聚焦页面输入框后再点击字段。
  chrome.tabs.sendMessage(tab.id, { type: "AUTUMN_APPLY_OPEN_ASSISTANT", profile, sections }, response => {
    const err = chrome.runtime.lastError;
    if (err) {
      setStatus("无法连接当前页面，请刷新网申页面后重试。", "err");
      return;
    }
    if (!response?.ok) {
      setStatus(response?.message || "打开侧边栏失败", "err");
      return;
    }
    setStatus("已打开安全侧边栏：先点网页字段，再点资料项填入。", "ok");
  });
}

async function fillCurrentPage() {
  await saveNow();
  const tab = await getActiveHttpTab();
  if (!tab) return;

  if (!confirm("将先打开本地字段扫描预览，不会立即填充。请在侧边栏勾选确认后再写入页面。继续？")) return;

  // 风控设计点：批量场景先展示本地扫描预览，由用户勾选确认后才写入字段。
  chrome.tabs.sendMessage(tab.id, { type: "AUTUMN_APPLY_PREVIEW", profile, sections }, response => {
    const err = chrome.runtime.lastError;
    if (err) {
      setStatus("无法连接当前页面，请刷新网申页面后重试。", "err");
      return;
    }
    if (!response?.ok) {
      setStatus(response?.message || "填充失败", "err");
      return;
    }
    setStatus("已打开字段扫描预览，请在侧边栏勾选后确认填充。", "ok");
  });
}

async function getActiveHttpTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !/^https?:\/\//.test(tab.url || "")) {
    setStatus("当前页面不支持，请打开 http/https 网申页面。", "err");
    return null;
  }
  return tab;
}

function exportJson() {
  syncActiveProfile();
  const json = JSON.stringify({
    schemaVersion: 2,
    activeProfileId,
    profiles: profileVersions,
    profile
  }, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `autumn-apply-profile-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  setStatus("已导出 JSON 备份", "ok");
}

function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const data = JSON.parse(String(reader.result));
      if (Array.isArray(data.profiles)) {
        profileVersions = normalizeProfileVersions(data.profiles, data.profile);
        activeProfileId = data.activeProfileId || profileVersions[0].id;
        profile = loadActiveProfile();
      } else {
        profile = mergeProfile(createDefaultProfile(), data.profile || data);
        syncActiveProfile();
      }
      render();
      renderProfileSelect();
      await saveNow();
      setStatus("已导入并保存到本机", "ok");
    } catch {
      setStatus("JSON 格式不正确，导入失败。", "err");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

async function clearProfile() {
  if (!confirm("确认清空本机保存的全部资料？")) return;
  profile = createDefaultProfile();
  profileVersions = [{
    id: DEFAULT_PROFILE_ID,
    name: "默认资料",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    profile
  }];
  activeProfileId = DEFAULT_PROFILE_ID;
  await chrome.storage.local.remove([STORAGE_KEY, PROFILES_KEY, ACTIVE_PROFILE_KEY]);
  render();
  renderProfileSelect();
  setStatus("已清空本机资料", "ok");
}

async function importResumeFiles(event) {
  const files = [...(event.target.files || [])];
  if (!files.length) return;

  const unsupported = [];
  let imported = 0;

  for (const file of files) {
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["txt", "md", "json"].includes(ext)) {
      unsupported.push(file.name);
      continue;
    }

    try {
      const text = await readFileAsText(file);
      const jsonData = ext === "json" ? JSON.parse(text) : null;
      const parsed = jsonData ? mergeProfile(createDefaultProfile(), jsonData.profile || jsonData) : parseResumeText(text);
      const version = createProfileVersion(file.name.replace(/\.[^.]+$/, ""), parsed);
      profileVersions.push(version);
      activeProfileId = version.id;
      profile = mergeProfile(createDefaultProfile(), version.profile);
      imported += 1;
    } catch {
      unsupported.push(file.name);
    }
  }

  render();
  renderProfileSelect();
  await saveNow();
  event.target.value = "";

  const messages = [];
  if (imported) messages.push(`已解析 ${imported} 份简历为本地资料版本`);
  if (unsupported.length) messages.push(`未解析：${unsupported.join("、")}。请先另存为 txt/md，或导出插件 JSON。`);
  setStatus(messages.join("；") || "未导入任何文件", imported ? "ok" : "err");
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

function createProfileVersion(name, parsedProfile) {
  const now = new Date().toISOString();
  return {
    id: `profile_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name: uniqueProfileName(name || "简历资料"),
    createdAt: now,
    updatedAt: now,
    profile: mergeProfile(createDefaultProfile(), parsedProfile)
  };
}

function uniqueProfileName(baseName) {
  const clean = baseName.trim().slice(0, 28) || "简历资料";
  const names = new Set(profileVersions.map(item => item.name));
  if (!names.has(clean)) return clean;
  let index = 2;
  while (names.has(`${clean} ${index}`)) index += 1;
  return `${clean} ${index}`;
}

function getActiveProfileName() {
  return profileVersions.find(item => item.id === activeProfileId)?.name || "当前资料";
}

function parseResumeText(text) {
  const normalized = text.replace(/\r/g, "\n").replace(/[ \t]+/g, " ");
  const lines = normalized.split("\n").map(line => line.trim()).filter(Boolean);
  const parsed = createDefaultProfile();

  parsed.basic.email = firstMatch(normalized, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  parsed.basic.phone = firstMatch(normalized, /(?:\+?86[- ]?)?1[3-9]\d{9}/);
  parsed.basic.idNumber = firstMatch(normalized, /\b\d{17}[\dXx]\b/);
  parsed.basic.wechat = labeledValue(normalized, ["微信", "微信号", "Wechat"]);
  parsed.basic.gender = firstMatch(normalized, /(?:^|[，,；;\s])(男|女)(?:$|[，,；;\s])/m);
  parsed.basic.politicalStatus = firstMatch(normalized, /(中共党员|预备党员|共青团员|群众)/);
  parsed.basic.birthDate = firstMatch(normalized, /\d{4}[./年-]\d{1,2}(?:[./月-]\d{1,2}日?)?/);
  parsed.basic.name = guessName(lines);
  parsed.basic.jobTarget = labeledValue(normalized, ["求职意向", "应聘岗位", "目标岗位", "意向岗位"]);
  parsed.basic.expectedCity = labeledValue(normalized, ["期望城市", "意向城市", "工作地点"]);

  const educationBlock = sectionBlock(normalized, ["教育经历", "教育背景", "教育经验"], ["实习经历", "工作经历", "项目经历", "校园经历", "获奖", "证书"]);
  const edu = parsed.education[0];
  edu.school = firstMatch(educationBlock, /[\u4e00-\u9fa5A-Za-z]+(?:大学|学院|学校|University|College)/i);
  edu.degree = firstMatch(educationBlock, /(博士|硕士|研究生|本科|学士|大专|专科|Doctor|Master|Bachelor)/i);
  edu.major = labeledValue(educationBlock, ["专业", "主修"]);
  edu.gpa = firstMatch(educationBlock, /GPA[:： ]?([0-9.]+\/?[0-9.]*)/i);
  edu.rank = firstMatch(educationBlock, /(?:排名|专业排名)[:： ]?([前]?\d+%?|\d+\/\d+)/);
  edu.courses = labeledValue(educationBlock, ["主修课程", "相关课程"]);

  const internshipBlock = sectionBlock(normalized, ["实习经历", "工作经历"], ["项目经历", "校园经历", "获奖", "证书", "自我评价"]);
  parsed.internships = parseExperienceRows(internshipBlock, "internship");

  const projectBlock = sectionBlock(normalized, ["项目经历", "项目经验"], ["实习经历", "工作经历", "获奖", "证书", "自我评价"]);
  parsed.projects = parseExperienceRows(projectBlock, "project");

  const awardBlock = sectionBlock(normalized, ["获奖证书", "获奖经历", "荣誉奖项", "证书"], ["自我评价", "个人评价", "技能", "项目经历"]);
  parsed.awards = parseAwardRows(awardBlock);

  const selfBlock = sectionBlock(normalized, ["自我评价", "个人评价", "个人总结"], []);
  parsed.self.summary = compactText(selfBlock).slice(0, 600);

  return parsed;
}

function guessName(lines) {
  for (const line of lines.slice(0, 8)) {
    const labeled = line.match(/(?:姓名|Name)[:： ]*([\u4e00-\u9fa5A-Za-z·]{2,20})/i);
    if (labeled) return labeled[1];
    if (/^[\u4e00-\u9fa5·]{2,4}$/.test(line)) return line;
  }
  return "";
}

function parseExperienceRows(block, type) {
  const rows = splitRows(block).map(row => {
    if (type === "project") {
      return {
        name: firstMatch(row, /(?:项目名称|项目)[:： ]?([^\n]{2,40})/) || firstUsefulLine(row),
        role: labeledValue(row, ["角色", "担任角色", "职责"]),
        startDate: firstMatch(row, /\d{4}[./年-]\d{1,2}/),
        endDate: secondDate(row),
        techStack: labeledValue(row, ["技术栈", "使用技术", "技术工具"]),
        description: compactText(row).slice(0, 500),
        result: labeledValue(row, ["成果", "结果", "产出"])
      };
    }
    return {
      company: firstMatch(row, /[\u4e00-\u9fa5A-Za-z0-9]+(?:公司|集团|科技|银行|证券|咨询|事务所|厂|实验室|中心|Co\.|Ltd\.|Inc\.)/i) || firstUsefulLine(row),
      department: labeledValue(row, ["部门"]),
      position: labeledValue(row, ["岗位", "职位", "职务"]),
      startDate: firstMatch(row, /\d{4}[./年-]\d{1,2}/),
      endDate: secondDate(row),
      city: labeledValue(row, ["城市", "地点"]),
      description: compactText(row).slice(0, 500)
    };
  }).filter(row => Object.values(row).some(Boolean));

  return rows.length ? rows : [emptyRecord(sections.find(section => section.key === (type === "project" ? "projects" : "internships")))];
}

function parseAwardRows(block) {
  const rows = splitRows(block).map(row => ({
    name: firstUsefulLine(row).slice(0, 60),
    level: firstMatch(row, /(国家级|省级|市级|校级|院级|一等奖|二等奖|三等奖|优秀奖)/),
    date: firstMatch(row, /\d{4}[./年-]\d{1,2}/),
    issuer: labeledValue(row, ["颁发机构", "机构"]),
    description: compactText(row).slice(0, 200)
  })).filter(row => row.name);
  return rows.length ? rows : [emptyRecord(sections.find(section => section.key === "awards"))];
}

function sectionBlock(text, starts, stops) {
  const startIndexes = starts.map(title => text.indexOf(title)).filter(index => index >= 0);
  if (!startIndexes.length) return "";
  const start = Math.min(...startIndexes);
  const afterStart = text.slice(start);
  const stopIndexes = stops.map(title => afterStart.indexOf(title, 2)).filter(index => index > 0);
  const end = stopIndexes.length ? Math.min(...stopIndexes) : afterStart.length;
  return afterStart.slice(0, end);
}

function splitRows(block) {
  if (!block) return [];
  return block
    .split(/\n{2,}|(?=\d{4}[./年-]\d{1,2})|(?=项目名称[:：])|(?=公司[:：])/)
    .map(row => row.trim())
    .filter(row => row.length > 8);
}

function labeledValue(text, labels) {
  for (const label of labels) {
    const match = text.match(new RegExp(`${label}\\s*[:： ]\\s*([^\\n；;，,]{2,80})`, "i"));
    if (match) return match[1].trim();
  }
  return "";
}

function firstMatch(text, regex) {
  const match = text.match(regex);
  return match ? (match[1] || match[0]).trim() : "";
}

function secondDate(text) {
  const dates = text.match(/\d{4}[./年-]\d{1,2}/g) || [];
  return dates[1] || "";
}

function firstUsefulLine(text) {
  return text.split("\n").map(line => line.trim()).find(line => line && !/^(教育经历|实习经历|工作经历|项目经历|获奖|证书)/.test(line)) || "";
}

function compactText(text) {
  return text.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
}

function setStatus(text, type = "") {
  const node = document.getElementById("status");
  node.className = type;
  node.textContent = text;
}
