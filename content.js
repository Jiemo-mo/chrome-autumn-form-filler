const FIELD_RULES = [
  { key: "basic.name", aliases: ["姓名", "真实姓名", "中文姓名", "应聘者姓名", "name"] },
  { key: "basic.gender", aliases: ["性别", "gender", "sex"] },
  { key: "basic.birthDate", aliases: ["出生日期", "出生年月", "生日", "birth", "birthday"] },
  { key: "basic.ethnicity", aliases: ["民族", "ethnicity", "nation"] },
  { key: "basic.phone", aliases: ["手机号", "手机号码", "联系电话", "电话", "phone", "mobile", "tel"] },
  { key: "basic.email", aliases: ["邮箱", "电子邮箱", "邮件", "email", "mail"] },
  { key: "basic.wechat", aliases: ["微信", "微信号", "wechat"] },
  { key: "basic.politicalStatus", aliases: ["政治面貌", "political"] },
  { key: "basic.idNumber", aliases: ["身份证号", "证件号码", "身份证号码", "idcard", "identity"] },
  { key: "basic.currentCity", aliases: ["当前城市", "所在城市", "现居城市", "currentcity"] },
  { key: "basic.hukou", aliases: ["户籍", "籍贯", "户口所在地", "hometown"] },
  { key: "basic.address", aliases: ["现居地址", "联系地址", "通讯地址", "address"] },
  { key: "basic.jobTarget", aliases: ["求职意向", "应聘岗位", "目标岗位", "岗位意向", "position"] },
  { key: "basic.expectedCity", aliases: ["期望城市", "意向城市", "工作地点", "工作城市"] },
  { key: "basic.expectedSalary", aliases: ["期望薪资", "薪资期望", "expected salary"] },
  { key: "education.school", aliases: ["学校", "毕业院校", "院校", "大学", "school", "university"] },
  { key: "education.degree", aliases: ["学历", "学位", "degree", "education"] },
  { key: "education.major", aliases: ["专业", "所学专业", "major"] },
  { key: "education.college", aliases: ["学院", "院系", "college", "department"] },
  { key: "education.startDate", aliases: ["入学时间", "教育开始时间", "开始时间", "startdate"] },
  { key: "education.endDate", aliases: ["毕业时间", "教育结束时间", "结束时间", "enddate"] },
  { key: "education.gpa", aliases: ["GPA", "绩点", "成绩"] },
  { key: "education.rank", aliases: ["排名", "专业排名", "rank"] },
  { key: "education.courses", aliases: ["主修课程", "相关课程", "课程"] },
  { key: "internships.company", aliases: ["实习公司", "公司名称", "单位名称", "company"] },
  { key: "internships.department", aliases: ["实习部门", "部门", "department"] },
  { key: "internships.position", aliases: ["实习岗位", "职位", "岗位", "position", "title"] },
  { key: "internships.startDate", aliases: ["实习开始时间", "开始日期", "start"] },
  { key: "internships.endDate", aliases: ["实习结束时间", "结束日期", "end"] },
  { key: "internships.city", aliases: ["实习城市", "城市", "city"] },
  { key: "internships.description", aliases: ["实习内容", "工作内容", "职责描述", "实习描述"] },
  { key: "projects.name", aliases: ["项目名称", "项目", "project"] },
  { key: "projects.role", aliases: ["项目角色", "担任角色", "role"] },
  { key: "projects.techStack", aliases: ["技术栈", "使用技术", "技术工具", "tech"] },
  { key: "projects.description", aliases: ["项目描述", "项目介绍", "项目内容"] },
  { key: "projects.result", aliases: ["项目成果", "项目结果", "成果"] },
  { key: "awards.name", aliases: ["奖项", "获奖", "证书", "奖励名称", "certificate", "award"] },
  { key: "awards.level", aliases: ["奖项级别", "证书级别", "级别"] },
  { key: "awards.date", aliases: ["获奖时间", "取得时间", "证书时间"] },
  { key: "family.relation", aliases: ["家庭成员关系", "亲属关系", "关系"] },
  { key: "family.name", aliases: ["家庭成员姓名", "亲属姓名", "成员姓名"] },
  { key: "family.phone", aliases: ["家庭成员电话", "亲属电话", "紧急联系人电话"] },
  { key: "family.workplace", aliases: ["工作单位", "家庭成员单位", "亲属单位"] },
  { key: "family.position", aliases: ["家庭成员职务", "亲属职务", "职务"] },
  { key: "self.summary", aliases: ["自我评价", "个人评价", "自我介绍", "个人简介"] },
  { key: "self.strengths", aliases: ["个人优势", "优势", "特长"] },
  { key: "self.careerPlan", aliases: ["职业规划", "发展规划", "职业目标"] }
];

const PLATFORM_ADAPTERS = [
  {
    id: "niuke",
    name: "牛客",
    hosts: ["nowcoder.com", "niuke.com"],
    aliases: {
      "basic.name": ["candidateName", "realName", "userName", "简历姓名"],
      "basic.phone": ["mobilePhone", "contactPhone", "联系手机"],
      "basic.email": ["contactEmail", "emailAddress"],
      "basic.jobTarget": ["投递岗位", "申请职位", "岗位名称"],
      "education.school": ["毕业学校", "院校名称"],
      "education.degree": ["最高学历", "学历类型"],
      "education.major": ["专业名称"],
      "internships.description": ["实习职责", "经历描述"],
      "projects.description": ["项目详情", "项目职责"]
    }
  },
  {
    id: "zhaopin",
    name: "智联招聘",
    hosts: ["zhaopin.com", "zhaopin.cn"],
    aliases: {
      "basic.name": ["fullName", "resumeName"],
      "basic.phone": ["mobile", "phoneNumber"],
      "basic.email": ["email", "emailAddr"],
      "basic.currentCity": ["居住地", "现居住地"],
      "basic.expectedCity": ["期望工作地点", "期望地点"],
      "basic.expectedSalary": ["期望月薪", "薪资要求"],
      "education.school": ["schoolName", "毕业院校"],
      "education.major": ["majorName", "专业类别"],
      "internships.company": ["workCompany", "公司"],
      "internships.position": ["jobTitle", "职位名称"]
    }
  },
  {
    id: "boss",
    name: "BOSS 直聘",
    hosts: ["zhipin.com", "kanzhun.com"],
    aliases: {
      "basic.name": ["姓名", "我的姓名"],
      "basic.phone": ["手机", "联系电话"],
      "basic.email": ["邮箱"],
      "basic.jobTarget": ["求职岗位", "期望职位"],
      "basic.expectedCity": ["期望地点", "求职城市"],
      "basic.expectedSalary": ["期望薪资", "薪资范围"],
      "education.school": ["学校名称"],
      "education.major": ["所学专业"],
      "projects.description": ["项目业绩", "项目内容"]
    }
  },
  {
    id: "beisen",
    name: "北森",
    hosts: ["italent.cn", "beisen.com", "beisencloud.com"],
    aliases: {
      "basic.name": ["userName", "personName", "姓名"],
      "basic.gender": ["性别"],
      "basic.phone": ["mobile", "phone", "手机"],
      "basic.email": ["email", "邮箱"],
      "basic.idNumber": ["certificateNo", "idNo", "证件号"],
      "education.school": ["school", "学校名称"],
      "education.degree": ["degree", "学历"],
      "education.major": ["major", "专业名称"],
      "internships.company": ["companyName", "实习单位"],
      "internships.position": ["positionName", "实习岗位"],
      "projects.name": ["projectName", "项目名称"]
    }
  },
  {
    id: "moka",
    name: "Moka",
    hosts: ["mokahr.com", "moka.com"],
    aliases: {
      "basic.name": ["姓名", "name"],
      "basic.phone": ["手机号", "mobile"],
      "basic.email": ["邮箱", "email"],
      "basic.wechat": ["微信号", "wechat"],
      "basic.jobTarget": ["申请职位", "job"],
      "education.school": ["school", "毕业学校"],
      "education.major": ["major", "专业"],
      "internships.company": ["company", "公司名称"],
      "internships.description": ["description", "经历描述"],
      "projects.description": ["项目描述", "description"]
    }
  }
];

const SIDEBAR_ID = "autumn-apply-safe-sidebar";
const FIELD_MEMORY_KEY = "autumnApplyFieldMemory";
const SENSITIVE_KEYS = ["idNumber", "phone", "email", "wechat"];
let lastFocusedControl = null;
let assistantState = { profile: {}, sections: [] };
let fieldMemory = {};

document.addEventListener("focusin", event => {
  const target = event.target;
  if (isFillableControl(target) || isEditableElement(target)) {
    lastFocusedControl = target;
  }
}, true);

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  try {
    if (message?.type === "AUTUMN_APPLY_OPEN_ASSISTANT") {
      assistantState = { profile: message.profile || {}, sections: message.sections || [] };
      chrome.storage.local.get(FIELD_MEMORY_KEY, stored => {
        fieldMemory = stored[FIELD_MEMORY_KEY] || {};
        openAssistantSidebar();
        sendResponse({ ok: true });
      });
      return true;
    }

    if (message?.type === "AUTUMN_APPLY_PREVIEW") {
      assistantState = { profile: message.profile || {}, sections: message.sections || [] };
      chrome.storage.local.get(FIELD_MEMORY_KEY, stored => {
        fieldMemory = stored[FIELD_MEMORY_KEY] || {};
        openAssistantSidebar({ showPreview: true });
        sendResponse({ ok: true });
      });
      return true;
    }

    if (message?.type === "AUTUMN_APPLY_FILL") {
      const result = fillPage(message.profile || {});
      sendResponse({ ok: true, ...result });
      return true;
    }
  } catch (error) {
    sendResponse({ ok: false, message: error?.message || "未知错误" });
    return true;
  }
});

function fillPage(profile) {
  const values = buildValueList(profile);
  const controls = getFillableControls();
  const usedControls = new WeakSet();
  const unmatched = [];
  let filled = 0;
  let skipped = 0;

  for (const item of values) {
    const control = findBestControl(controls, item, usedControls);
    if (!control) {
      skipped += 1;
      unmatched.push(item.label || item.key);
      continue;
    }
    const ok = applyValue(control, item.value);
    if (ok) {
      usedControls.add(control);
      filled += 1;
    } else {
      skipped += 1;
    }
  }

  // 风控设计点：本脚本只写入字段值并触发 input/change 事件；绝不点击提交、保存、下一步、翻页按钮。
  return { filled, skipped, unmatched: unmatched.slice(0, 8), platform: getPagePlatform().name };
}

function fillScanItems(scanItems) {
  let filled = 0;
  let skipped = 0;
  for (const item of scanItems) {
    const control = getFillableControls()[item.controlIndex];
    if (!control || !item.value) {
      skipped += 1;
      continue;
    }
    if (applyValue(control, item.value)) {
      rememberFieldMapping(control, item.path);
      filled += 1;
    } else {
      skipped += 1;
    }
  }
  return { filled, skipped };
}

function scanPage(profile) {
  const values = buildValueList(profile);
  const controls = getFillableControls();
  return controls.map((control, index) => {
    const candidates = values
      .map(item => scoreControlMatch(control, item))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score);
    const best = candidates[0];
    return {
      controlIndex: index,
      fieldText: getControlSummary(control),
      tag: control.tagName.toLowerCase(),
      type: control.type || "",
      path: best?.path || "",
      label: best?.label || "",
      value: best?.value || "",
      confidence: best ? confidenceName(best.score) : "未识别",
      score: best?.score || 0,
      checked: Boolean(best && best.score >= 70)
    };
  });
}

function scoreControlMatch(control, item) {
  const aliases = item.aliases.map(normalize);
  const labelText = normalize(getLabelText(control));
  const attrText = normalize([
    control.name,
    control.id,
    control.getAttribute("aria-label"),
    control.getAttribute("data-field"),
    control.getAttribute("data-name"),
    control.getAttribute("data-testid"),
    control.getAttribute("title"),
    control.placeholder,
    control.className
  ].filter(Boolean).join(" "));
  const memoryPath = getRememberedFieldPath(control);

  if (memoryPath && memoryPath === item.path) return { ...item, score: 96 };
  if (labelText && aliases.some(alias => labelText.includes(alias))) return { ...item, score: 86 };
  if (attrText && aliases.some(alias => attrText.includes(alias))) return { ...item, score: 72 };
  if (labelText && aliases.some(alias => alias.length >= 2 && alias.includes(labelText))) return { ...item, score: 58 };
  return { ...item, score: 0 };
}

function confidenceName(score) {
  if (score >= 90) return "记忆";
  if (score >= 80) return "高";
  if (score >= 70) return "中";
  if (score > 0) return "低";
  return "未识别";
}

function buildValueList(profile) {
  const list = [];
  const adapterAliases = getActivePlatformAliases();
  for (const rule of FIELD_RULES) {
    const value = getProfileValue(profile, rule.key);
    if (value) {
      list.push({
        ...rule,
        path: rule.key,
        label: getFieldLabel(rule.key),
        aliases: [...rule.aliases, ...(adapterAliases[rule.key] || [])],
        value
      });
    }
  }
  return list;
}

function getProfileValue(profile, path) {
  const [section, field] = path.split(".");
  const source = profile[section];
  if (Array.isArray(source)) {
    return source.map(row => row?.[field]).find(Boolean) || "";
  }
  return source?.[field] || "";
}

function getActivePlatformAliases() {
  return getPagePlatform().adapter?.aliases || {};
}

function getPagePlatform() {
  const host = location.hostname.toLowerCase();
  const adapter = PLATFORM_ADAPTERS.find(item => item.hosts.some(domain => host === domain || host.endsWith(`.${domain}`)));
  if (adapter) return { id: adapter.id, name: adapter.name, adapter };
  return { id: "generic", name: "企业官网/通用表单", adapter: null };
}

function getFieldLabel(path) {
  const [sectionKey, fieldKey] = path.split(".");
  const section = assistantState.sections.find(item => item.key === sectionKey);
  return section?.fields.find(([key]) => key === fieldKey)?.[1] || path;
}

function getFillableControls() {
  return [...document.querySelectorAll("input, textarea, select")]
    .filter(isFillableControl);
}

function findBestControl(controls, item, usedControls) {
  const aliases = item.aliases.map(normalize);

  const byLabel = controls.find(control => {
    if (usedControls.has(control)) return false;
    const labelText = normalize(getLabelText(control));
    return labelText && aliases.some(alias => labelText.includes(alias));
  });
  if (byLabel) return byLabel;

  return controls.find(control => {
    if (usedControls.has(control)) return false;
    const attrText = normalize([
      control.name,
      control.id,
      control.getAttribute("aria-label"),
      control.getAttribute("data-field"),
      control.getAttribute("data-name"),
      control.getAttribute("data-testid"),
      control.getAttribute("title"),
      control.placeholder,
      control.className
    ].filter(Boolean).join(" "));
    return attrText && aliases.some(alias => attrText.includes(alias));
  });
}

function getLabelText(control) {
  const parts = [];
  if (control.labels) {
    for (const label of control.labels) parts.push(label.innerText || label.textContent || "");
  }
  if (control.id) {
    const label = document.querySelector(`label[for="${cssEscape(control.id)}"]`);
    if (label) parts.push(label.innerText || label.textContent || "");
  }
  const row = control.closest(".form-item, .ant-form-item, .moka-form-item, .atsx-form-item, .el-form-item, .ivu-form-item, .semi-form-field, .arco-form-item, .form-group, .resume-item, .field, li, tr, .row");
  if (row) {
    const text = row.innerText || row.textContent || "";
    if (text.length < 180) parts.push(text);
  }
  return parts.join(" ");
}

function applyValue(control, value) {
  if (!value) return false;
  const tag = control.tagName.toLowerCase();
  if (tag === "select") return selectByText(control, value);
  if (tag === "textarea") return setNativeValue(control, value);

  const type = (control.type || "text").toLowerCase();
  if (type === "radio") return setRadio(control, value);
  if (type === "checkbox") return setCheckbox(control, value);
  return setNativeValue(control, value);
}

function selectByText(select, value) {
  const expected = normalize(value);
  const options = [...select.options];
  const option = options.find(opt => normalize(opt.textContent).includes(expected))
    || options.find(opt => expected.includes(normalize(opt.textContent)));
  if (!option) return false;

  // 下拉框风控/兼容设计点：按 option 文本匹配并设置 selectedIndex，不直接猜测写 value。
  select.selectedIndex = options.indexOf(option);
  dispatchInputEvents(select);
  return true;
}

function setRadio(radio, value) {
  const name = radio.name;
  const group = name ? [...document.querySelectorAll(`input[type="radio"][name="${cssEscape(name)}"]`)] : [radio];
  const expected = normalize(value);
  const target = group.find(item => {
    const text = normalize(`${item.value || ""} ${getLabelText(item)}`);
    return text.includes(expected) || expected.includes(text);
  });
  if (!target) return false;
  target.checked = true;
  dispatchInputEvents(target);
  return true;
}

function setCheckbox(checkbox, value) {
  const text = normalize(String(value));
  if (!["是", "有", "true", "yes", "1"].includes(text)) return false;
  checkbox.checked = true;
  dispatchInputEvents(checkbox);
  return true;
}

function setNativeValue(control, value) {
  const prototype = control.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
  if (!setter) return false;
  setter.call(control, value);
  dispatchInputEvents(control);
  return true;
}

function openAssistantSidebar(options = {}) {
  const old = document.getElementById(SIDEBAR_ID);
  if (old) old.remove();

  const host = document.createElement("div");
  host.id = SIDEBAR_ID;
  const shadow = host.attachShadow({ mode: "open" });
  shadow.append(createSidebarStyle(), createSidebarView(shadow, options));
  document.documentElement.append(host);
}

function createSidebarStyle() {
  const style = document.createElement("style");
  style.textContent = `
    :host {
      position: fixed;
      top: 72px;
      right: 16px;
      width: 318px;
      max-height: calc(100vh - 96px);
      z-index: 2147483647;
      color: #172033;
      font: 13px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", sans-serif;
    }
    * { box-sizing: border-box; }
    .panel {
      overflow: hidden;
      border: 1px solid #d8dee8;
      border-radius: 8px;
      background: #fff;
      box-shadow: 0 12px 32px rgba(23, 32, 51, .18);
    }
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 10px 12px;
      border-bottom: 1px solid #d8dee8;
      background: #f7f9fc;
      font-weight: 700;
    }
    .close {
      width: 28px;
      height: 28px;
      border: 1px solid #d8dee8;
      border-radius: 6px;
      background: #fff;
      cursor: pointer;
    }
    .search {
      width: calc(100% - 24px);
      margin: 10px 12px;
      min-height: 32px;
      border: 1px solid #d8dee8;
      border-radius: 6px;
      padding: 7px 8px;
      outline: none;
      font: inherit;
    }
    .hint {
      margin: 0 12px 10px;
      color: #687386;
      font-size: 12px;
    }
    .meta {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin: 10px 12px;
    }
    .pill {
      padding: 6px 8px;
      border: 1px solid #d8dee8;
      border-radius: 6px;
      background: #fbfcfe;
      color: #687386;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .list {
      max-height: calc(100vh - 220px);
      overflow: auto;
      padding: 0 12px 12px;
    }
    details {
      margin-bottom: 8px;
      border: 1px solid #d8dee8;
      border-radius: 8px;
      overflow: hidden;
      background: #fff;
    }
    summary {
      padding: 8px 10px;
      cursor: pointer;
      font-weight: 700;
      user-select: none;
      background: #fbfcfe;
    }
    .item {
      display: grid;
      grid-template-columns: 86px 1fr;
      gap: 8px;
      width: 100%;
      min-height: 34px;
      padding: 7px 10px;
      border: 0;
      border-top: 1px solid #edf1f6;
      background: #fff;
      color: inherit;
      text-align: left;
      cursor: pointer;
      font: inherit;
    }
    .item:hover { background: #f2f6ff; }
    .label { color: #687386; }
    .value {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .empty {
      padding: 12px 10px;
      color: #687386;
      border-top: 1px solid #edf1f6;
    }
    .status {
      min-height: 30px;
      padding: 8px 12px;
      border-top: 1px solid #d8dee8;
      color: #267447;
      background: #fbfcfe;
      font-size: 12px;
    }
    .toolbar {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin: 0 12px 10px;
    }
    .tool-btn {
      min-height: 32px;
      border: 1px solid #d8dee8;
      border-radius: 6px;
      background: #fff;
      cursor: pointer;
      font: inherit;
    }
    .tool-btn.primary {
      background: #1769e0;
      border-color: #1769e0;
      color: #fff;
      font-weight: 700;
    }
    .preview {
      display: none;
      max-height: 260px;
      overflow: auto;
      margin: 0 12px 12px;
      border: 1px solid #d8dee8;
      border-radius: 8px;
      background: #fff;
    }
    .preview.open { display: block; }
    .preview-row {
      display: grid;
      grid-template-columns: 22px 1fr;
      gap: 6px;
      padding: 8px;
      border-top: 1px solid #edf1f6;
      font-size: 12px;
    }
    .preview-row:first-child { border-top: 0; }
    .preview-main {
      display: grid;
      gap: 3px;
      min-width: 0;
    }
    .preview-field {
      color: #172033;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .preview-map {
      color: #687386;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .badge {
      display: inline-block;
      margin-left: 4px;
      padding: 1px 5px;
      border-radius: 999px;
      background: #edf4ff;
      color: #1769e0;
      font-size: 11px;
    }
  `;
  return style;
}

function createSidebarView(shadow, options = {}) {
  const panel = document.createElement("div");
  panel.className = "panel";

  const head = document.createElement("div");
  head.className = "head";
  head.append(document.createTextNode("安全填表侧边栏"));

  const close = document.createElement("button");
  close.type = "button";
  close.className = "close";
  close.title = "关闭";
  close.textContent = "×";
  close.addEventListener("click", () => document.getElementById(SIDEBAR_ID)?.remove());
  head.append(close);

  const search = document.createElement("input");
  search.className = "search";
  search.placeholder = "搜索字段，例如 手机、学校、项目";

  const meta = document.createElement("div");
  meta.className = "meta";

  const platform = document.createElement("div");
  platform.className = "pill";
  platform.title = "当前页面平台识别";
  platform.textContent = `平台：${getPagePlatform().name}`;

  const controls = document.createElement("div");
  controls.className = "pill";
  controls.title = "当前页面可直接填充的原生控件数量";
  controls.textContent = `控件：${getFillableControls().length} 个`;
  meta.append(platform, controls);

  const hint = document.createElement("p");
  hint.className = "hint";
  hint.textContent = "先点击网页输入框，再点击下方资料项。不会自动提交、保存、翻页。";

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";
  const scanBtn = document.createElement("button");
  scanBtn.type = "button";
  scanBtn.className = "tool-btn";
  scanBtn.textContent = "扫描预览";
  const fillPreviewBtn = document.createElement("button");
  fillPreviewBtn.type = "button";
  fillPreviewBtn.className = "tool-btn primary";
  fillPreviewBtn.textContent = "填充勾选项";
  toolbar.append(scanBtn, fillPreviewBtn);

  const preview = document.createElement("div");
  preview.className = "preview";
  let latestScan = [];

  const list = document.createElement("div");
  list.className = "list";

  const status = document.createElement("div");
  status.className = "status";
  status.textContent = "等待选择网页字段";

  const renderList = () => {
    list.textContent = "";
    const groups = flattenProfileForSidebar(assistantState.profile, assistantState.sections, search.value);
    if (!groups.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = "暂无可用资料，请先在插件弹窗中录入。";
      list.append(empty);
      return;
    }

    for (const group of groups) {
      const details = document.createElement("details");
      details.open = true;
      const summary = document.createElement("summary");
      summary.textContent = group.title;
      details.append(summary);

      for (const item of group.items) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "item";
        button.title = item.value;
        button.addEventListener("mousedown", event => event.preventDefault());
        button.addEventListener("click", () => {
          const result = fillFocusedControl(item);
          status.textContent = result.message;
          status.style.color = result.ok ? "#267447" : "#c83b3b";
        });

        const label = document.createElement("span");
        label.className = "label";
        label.textContent = item.label;

        const value = document.createElement("span");
        value.className = "value";
        value.textContent = item.sensitive ? maskValue(item.value) : item.value;

        button.append(label, value);
        details.append(button);
      }
      list.append(details);
    }
  };

  search.addEventListener("input", renderList);
  renderList();

  const renderPreview = () => {
    latestScan = scanPage(assistantState.profile);
    preview.textContent = "";
    preview.classList.add("open");

    const matched = latestScan.filter(item => item.path);
    if (!matched.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = "未识别到可预览匹配，建议使用侧边栏逐项填充。";
      preview.append(empty);
      status.textContent = "扫描完成：暂无匹配字段";
      status.style.color = "#c83b3b";
      return;
    }

    for (const item of matched) {
      const row = document.createElement("label");
      row.className = "preview-row";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.checked;
      checkbox.dataset.index = String(item.controlIndex);

      const main = document.createElement("span");
      main.className = "preview-main";
      const field = document.createElement("span");
      field.className = "preview-field";
      field.textContent = item.fieldText || `${item.tag} ${item.type}`;
      const map = document.createElement("span");
      map.className = "preview-map";
      map.textContent = `${item.label} -> ${maskIfSensitive(item.path, item.value)}`;
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = item.confidence;
      map.append(badge);
      main.append(field, map);
      row.append(checkbox, main);
      preview.append(row);
    }

    status.textContent = `扫描完成：识别 ${matched.length} 个字段，高/中置信默认勾选。`;
    status.style.color = "#267447";
  };

  scanBtn.addEventListener("click", renderPreview);
  fillPreviewBtn.addEventListener("click", () => {
    if (!latestScan.length) renderPreview();
    const checkedIndexes = [...preview.querySelectorAll("input[type='checkbox']:checked")]
      .map(input => Number(input.dataset.index));
    const selected = latestScan.filter(item => checkedIndexes.includes(item.controlIndex) && item.path);
    const result = fillScanItems(selected);
    status.textContent = `已填充 ${result.filled} 项，跳过 ${result.skipped} 项。请人工核对。`;
    status.style.color = result.filled ? "#267447" : "#c83b3b";
  });

  panel.append(head, search, meta, hint, toolbar, preview, list, status);
  if (options.showPreview) setTimeout(renderPreview, 0);
  return panel;
}

function flattenProfileForSidebar(profile, sections, keyword) {
  const normalizedKeyword = normalize(keyword);
  const groups = [];

  for (const section of sections) {
    if (section.key === "source") continue;
    const source = profile[section.key];
    const rows = Array.isArray(source) ? source : [source];
    const items = [];

    rows.forEach((row, rowIndex) => {
      for (const [fieldKey, fieldLabel] of section.fields) {
        const value = String(row?.[fieldKey] || "").trim();
        if (!value) continue;
        const label = rows.length > 1 ? `${fieldLabel}${rowIndex + 1}` : fieldLabel;
        const haystack = normalize(`${section.title}${label}${value}`);
        if (normalizedKeyword && !haystack.includes(normalizedKeyword)) continue;
        items.push({
          label,
          path: `${section.key}.${fieldKey}`,
          value,
          sensitive: SENSITIVE_KEYS.includes(fieldKey) || /身份证|手机|电话|邮箱|微信/.test(fieldLabel)
        });
      }
    });

    if (items.length) groups.push({ title: section.title, items });
  }

  return groups;
}

function fillFocusedControl(item) {
  const control = lastFocusedControl;
  if (!control || !document.contains(control)) {
    return { ok: false, message: "请先点击网页里的目标输入框。" };
  }
  if (!isFillableControl(control) && !isEditableElement(control)) {
    return { ok: false, message: "当前选中的字段不支持填充。" };
  }

  const value = typeof item === "string" ? item : item.value;
  const path = typeof item === "string" ? "" : item.path;
  const ok = isEditableElement(control) ? setEditableValue(control, value) : applyValue(control, value);
  if (ok && path) rememberFieldMapping(control, path);
  return ok
    ? { ok: true, message: path ? "已填入并记住该字段映射，请人工核对。" : "已填入当前字段，请人工核对。" }
    : { ok: false, message: "当前字段未能填入，请手动处理。" };
}

function setEditableValue(element, value) {
  element.textContent = value;
  element.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: value }));
  element.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

function rememberFieldMapping(control, path) {
  const key = getMemoryKey(control);
  if (!key || !path) return;
  fieldMemory[key] = { path, updatedAt: new Date().toISOString() };
  chrome.storage.local.set({ [FIELD_MEMORY_KEY]: fieldMemory });
}

function getRememberedFieldPath(control) {
  return fieldMemory[getMemoryKey(control)]?.path || "";
}

function getMemoryKey(control) {
  const platform = getPagePlatform().id;
  const feature = normalize([
    control.name,
    control.id,
    control.getAttribute("aria-label"),
    control.getAttribute("data-field"),
    control.getAttribute("data-name"),
    control.placeholder,
    getLabelText(control).slice(0, 80)
  ].filter(Boolean).join("|"));
  return feature ? `${location.hostname}|${platform}|${feature}` : "";
}

function getControlSummary(control) {
  const text = getLabelText(control)
    || control.placeholder
    || control.getAttribute("aria-label")
    || control.name
    || control.id
    || control.tagName.toLowerCase();
  return text.replace(/\s+/g, " ").trim().slice(0, 80);
}

function maskIfSensitive(path, value) {
  const fieldKey = path.split(".")[1] || "";
  return SENSITIVE_KEYS.includes(fieldKey) ? maskValue(value) : value;
}

function isFillableControl(el) {
  if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) return false;
  if (el.disabled || el.readOnly) return false;
  if (el.offsetParent === null && el.getClientRects().length === 0) return false;
  if (el.tagName === "INPUT") {
    const type = (el.type || "text").toLowerCase();
    return !["hidden", "password", "file", "submit", "button", "reset", "image"].includes(type);
  }
  return true;
}

function isEditableElement(el) {
  return el instanceof HTMLElement && el.isContentEditable;
}

function maskValue(value) {
  const text = String(value);
  if (text.length <= 4) return "****";
  return `${text.slice(0, 2)}${"*".repeat(Math.min(8, text.length - 4))}${text.slice(-2)}`;
}

function dispatchInputEvents(control) {
  // 兼容北森、Moka 等前端框架的受控表单，同时不模拟高速逐字输入。
  control.dispatchEvent(new Event("input", { bubbles: true }));
  control.dispatchEvent(new Event("change", { bubbles: true }));
}

function normalize(text) {
  return String(text || "")
    .replace(/\s+/g, "")
    .replace(/[：:＊*]/g, "")
    .toLowerCase();
}

function cssEscape(value) {
  if (window.CSS?.escape) return CSS.escape(value);
  return String(value).replace(/["\\]/g, "\\$&");
}
