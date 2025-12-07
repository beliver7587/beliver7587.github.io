// 简历编辑器主类
class ResumeEditor {
    constructor() {
        this.isAuthenticated = false;
        this.isEditMode = false;
        this.password = "23985404";
        this.resumeData = this.loadResumeData();
        
        this.init();
    }

    // 初始化应用
    init() {
        this.bindEvents();
        this.renderResume();
        // 不再自动显示密码模态框，改为点击编辑按钮才显示
    }

    // 绑定事件监听器
    bindEvents() {
        // 编辑入口按钮
        document.getElementById('editBtn').addEventListener('click', () => this.showPasswordModal());

        // 密码验证
        document.getElementById('verifyBtn').addEventListener('click', () => this.verifyPassword());
        document.getElementById('passwordInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.verifyPassword();
        });

        // 编辑面板按钮
        document.getElementById('addModuleBtn').addEventListener('click', () => this.showAddModuleModal());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveResume());
        document.getElementById('toggleEditBtn').addEventListener('click', () => this.toggleEditMode());

        // 添加模块模态框
        document.getElementById('closeModuleModal').addEventListener('click', () => this.hideAddModuleModal());

        // 点击模态框外部关闭
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideAddModuleModal();
            }
        });

        // 模块类型选择
        document.querySelectorAll('.module-type').forEach(type => {
            type.addEventListener('click', (e) => {
                const moduleType = e.currentTarget.dataset.type;
                this.addModule(moduleType);
                this.hideAddModuleModal();
            });
        });
    }

    // 显示密码模态框
    showPasswordModal() {
        const modal = document.getElementById('passwordModal');
        modal.style.display = 'flex';
    }

    // 隐藏密码模态框
    hidePasswordModal() {
        const modal = document.getElementById('passwordModal');
        modal.style.display = 'none';
    }

    // 验证密码
    verifyPassword() {
        const input = document.getElementById('passwordInput');
        const errorMsg = document.getElementById('errorMsg');
        
        if (input.value === this.password) {
            this.isAuthenticated = true;
            this.hidePasswordModal();
            this.showEditPanel();
            this.hideEditEntry();
            this.enableEditMode();
        } else {
            errorMsg.textContent = '密码错误，请重试！';
            errorMsg.style.display = 'block';
            input.value = '';
            input.focus();
        }
    }

    // 显示编辑入口按钮
    showEditEntry() {
        const editEntry = document.getElementById('editEntry');
        editEntry.style.display = 'block';
    }

    // 隐藏编辑入口按钮
    hideEditEntry() {
        const editEntry = document.getElementById('editEntry');
        editEntry.style.display = 'none';
    }

    // 显示编辑面板
    showEditPanel() {
        const editPanel = document.getElementById('editPanel');
        editPanel.style.display = 'block';
    }

    // 显示添加模块模态框
    showAddModuleModal() {
        const modal = document.getElementById('addModuleModal');
        modal.style.display = 'flex';
    }

    // 隐藏添加模块模态框
    hideAddModuleModal() {
        const modal = document.getElementById('addModuleModal');
        modal.style.display = 'none';
    }

    // 切换编辑模式（已合并到下方完整实现）

    // 启用编辑模式
    enableEditMode() {
        this.isEditMode = true;
        const resume = document.getElementById('resume');
        resume.classList.add('edit-mode');
        this.enableEditableElements();
    }

    // 启用可编辑元素
    enableEditableElements() {
        setTimeout(() => {
            const editableElements = document.querySelectorAll('.editable');
            editableElements.forEach(el => {
                el.addEventListener('dblclick', (e) => this.makeElementEditable(e.target));
            });
        }, 100);
    }

    // 使元素可编辑
    makeElementEditable(element) {
        if (!this.isAuthenticated || !this.isEditMode) return;
        
        const originalContent = element.textContent;
        const elementType = element.dataset.type || 'text';
        
        if (elementType === 'text') {
            element.contentEditable = 'true';
            element.focus();
            
            // 选中全部内容
            const range = document.createRange();
            range.selectNodeContents(element);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            
            // 失去焦点时保存
            element.addEventListener('blur', () => {
                element.contentEditable = 'false';
                this.saveResumeData();
            });
            
            // 按下Enter键保存
            element.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    element.blur();
                }
            });
        }
    }

    // 渲染简历
    renderResume() {
        const resumeContainer = document.getElementById('resume');
        resumeContainer.innerHTML = this.generateResumeHTML();
        this.enableEditableElements();
    }

    // 生成简历HTML
    generateResumeHTML() {
        return `
            <div class="resume-header">
                <h1 class="editable" data-section="header" data-field="name">${this.resumeData.header.name || '你的姓名'}</h1>
                <div class="title editable" data-section="header" data-field="title">${this.resumeData.header.title || '前端开发工程师'}</div>
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span class="editable" data-section="header" data-field="email">${this.resumeData.header.email || 'your.email@example.com'}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span class="editable" data-section="header" data-field="phone">${this.resumeData.header.phone || '138-0013-8000'}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span class="editable" data-section="header" data-field="location">${this.resumeData.header.location || '北京市'}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-github"></i>
                        <span class="editable" data-section="header" data-field="github">${this.resumeData.header.github || 'github.com/yourusername'}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fab fa-linkedin"></i>
                        <span class="editable" data-section="header" data-field="linkedin">${this.resumeData.header.linkedin || 'linkedin.com/in/yourusername'}</span>
                    </div>
                </div>
            </div>
            <div class="resume-content">
                ${this.generateModulesHTML()}
            </div>
        `;
    }

    // 生成模块HTML
    generateModulesHTML() {
        return this.resumeData.modules.map(module => {
            const moduleTemplate = this.getModuleTemplate(module.type, module.id);
            return `
                <div class="module ${module.type}" data-module-id="${module.id}">
                    <div class="module-header">
                        <h2 class="module-title">
                            ${this.getModuleIcon(module.type)}
                            <span class="editable" data-module="${module.id}" data-field="title">${module.title || this.getModuleDefaultTitle(module.type)}</span>
                        </h2>
                        <div class="module-actions">
                            <button class="btn btn-danger btn-sm" onclick="resumeEditor.removeModule('${module.id}')" title="删除模块">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    ${moduleTemplate}
                </div>
            `;
        }).join('');
    }

    // 获取模块图标
    getModuleIcon(type) {
        const icons = {
            basic: '<i class="fas fa-user-circle"></i>',
            education: '<i class="fas fa-graduation-cap"></i>',
            experience: '<i class="fas fa-briefcase"></i>',
            skills: '<i class="fas fa-code"></i>',
            projects: '<i class="fas fa-project-diagram"></i>',
            certifications: '<i class="fas fa-certificate"></i>'
        };
        return icons[type] || '<i class="fas fa-cube"></i>';
    }

    // 获取模块默认标题
    getModuleDefaultTitle(type) {
        const titles = {
            basic: '基本信息',
            education: '教育经历',
            experience: '工作经历',
            skills: '技能特长',
            projects: '项目经验',
            certifications: '证书奖项'
        };
        return titles[type] || '模块标题';
    }

    // 获取模块模板
    getModuleTemplate(type, moduleId) {
        const module = this.resumeData.modules.find(m => m.id === moduleId);
        
        switch (type) {
            case 'basic':
                return this.getBasicInfoTemplate(module);
            case 'education':
                return this.getEducationTemplate(module);
            case 'experience':
                return this.getExperienceTemplate(module);
            case 'skills':
                return this.getSkillsTemplate(module);
            case 'projects':
                return this.getProjectsTemplate(module);
            case 'certifications':
                return this.getCertificationsTemplate(module);
            default:
                return '<div class="editable" data-module="' + moduleId + '" data-field="content">在此添加内容...</div>';
        }
    }

    // 基本信息模块模板
    getBasicInfoTemplate(module) {
        return `
            <div class="basic-info">
                <div class="info-item">
                    <div class="info-label">出生日期</div>
                    <div class="info-value editable" data-module="${module.id}" data-field="birthday">${module.birthday || '1990-01-01'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">性别</div>
                    <div class="info-value editable" data-module="${module.id}" data-field="gender">${module.gender || '男'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">学历</div>
                    <div class="info-value editable" data-module="${module.id}" data-field="education">${module.education || '本科'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">专业</div>
                    <div class="info-value editable" data-module="${module.id}" data-field="major">${module.major || '计算机科学与技术'}</div>
                </div>
            </div>
        `;
    }

    // 教育经历模块模板
    getEducationTemplate(module) {
        return `
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-header">
                        <div>
                            <div class="timeline-title editable" data-module="${module.id}" data-field="school">${module.school || '北京大学'}</div>
                            <div class="timeline-company editable" data-module="${module.id}" data-field="degree">${module.degree || '本科'}</div>
                        </div>
                        <div class="timeline-period editable" data-module="${module.id}" data-field="period">${module.period || '2015 - 2019'}</div>
                    </div>
                    <div class="timeline-description editable" data-module="${module.id}" data-field="description">${module.description || '主修计算机科学与技术，GPA 3.8/4.0，多次获得奖学金。'}</div>
                </div>
            </div>
        `;
    }

    // 工作经历模块模板
    getExperienceTemplate(module) {
        return `
            <div class="timeline">
                <div class="timeline-item">
                    <div class="timeline-header">
                        <div>
                            <div class="timeline-title editable" data-module="${module.id}" data-field="position">${module.position || '前端开发工程师'}</div>
                            <div class="timeline-company editable" data-module="${module.id}" data-field="company">${module.company || '科技有限公司'}</div>
                        </div>
                        <div class="timeline-period editable" data-module="${module.id}" data-field="period">${module.period || '2019 - 至今'}</div>
                    </div>
                    <div class="timeline-description">
                        <div class="editable" data-module="${module.id}" data-field="description">${module.description || '负责公司前端开发工作，参与多个大型项目的设计与开发。'}</div>
                        <ul>
                            <li class="editable" data-module="${module.id}" data-field="achievement1">${module.achievement1 || '实现了响应式设计，提升了移动端用户体验'}</li>
                            <li class="editable" data-module="${module.id}" data-field="achievement2">${module.achievement2 || '优化了页面加载速度，减少了30%的加载时间'}</li>
                            <li class="editable" data-module="${module.id}" data-field="achievement3">${module.achievement3 || '参与团队协作，提高了开发效率'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    // 技能模块模板
    getSkillsTemplate(module) {
        return `
            <div class="skills-grid">
                <div class="skill-category">
                    <h4><i class="fab fa-js"></i> 前端技术</h4>
                    <div class="skill-list">
                        <span class="skill-item editable" data-module="${module.id}" data-field="skill1">${module.skill1 || 'HTML5'}</span>
                        <span class="skill-item editable" data-module="${module.id}" data-field="skill2">${module.skill2 || 'CSS3'}</span>
                        <span class="skill-item editable" data-module="${module.id}" data-field="skill3">${module.skill3 || 'JavaScript'}</span>
                        <span class="skill-item editable" data-module="${module.id}" data-field="skill4">${module.skill4 || 'React'}</span>
                        <span class="skill-item editable" data-module="${module.id}" data-field="skill5">${module.skill5 || 'Vue'}</span>
                    </div>
                </div>
                <div class="skill-category">
                    <h4><i class="fas fa-server"></i> 后端技术</h4>
                    <div class="skill-list">
                        <span class="skill-item editable" data-module="${module.id}" data-field="skill6">${module.skill6 || 'Node.js'}</span>
                        <span class="skill-item editable" data-module="${module.id}" data-field="skill7">${module.skill7 || 'Express'}</span>
                        <span class="skill-item editable" data-module="${module.id}" data-field="skill8">${module.skill8 || 'MongoDB'}</span>
                    </div>
                </div>
                <div class="skill-category">
                    <h4><i class="fas fa-tools"></i> 开发工具</h4>
                    <div class="skill-list">
                        <span class="skill-item editable" data-module="${module.id}" data-field="skill9">${module.skill9 || 'Git'}</span>
                        <span class="skill-item editable" data-module="${module.id}" data-field="skill10">${module.skill10 || 'Webpack'}</span>
                        <span class="skill-item editable" data-module="${module.id}" data-field="skill11">${module.skill11 || 'VS Code'}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // 项目经验模块模板
    getProjectsTemplate(module) {
        return `
            <div class="projects-grid">
                <div class="project-item">
                    <div class="project-header">
                        <div>
                            <div class="project-title editable" data-module="${module.id}" data-field="projectTitle">${module.projectTitle || '电商网站前端开发'}</div>
                            <div class="project-technologies">
                                <span class="editable" data-module="${module.id}" data-field="tech1">${module.tech1 || 'React'}</span>
                                <span class="editable" data-module="${module.id}" data-field="tech2">${module.tech2 || 'Redux'}</span>
                                <span class="editable" data-module="${module.id}" data-field="tech3">${module.tech3 || 'Ant Design'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="project-description editable" data-module="${module.id}" data-field="projectDesc">${module.projectDesc || '负责电商网站的前端开发，包括商品列表、购物车、订单管理等功能模块。'}</div>
                    <div class="project-achievements">
                        <h5>项目成果：</h5>
                        <ul>
                            <li class="editable" data-module="${module.id}" data-field="projectAchievement1">${module.projectAchievement1 || '实现了商品列表的无限滚动加载'}</li>
                            <li class="editable" data-module="${module.id}" data-field="projectAchievement2">${module.projectAchievement2 || '优化了购物车的性能，减少了页面卡顿'}</li>
                            <li class="editable" data-module="${module.id}" data-field="projectAchievement3">${module.projectAchievement3 || '提高了网站的响应速度和用户体验'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    // 证书奖项模块模板
    getCertificationsTemplate(module) {
        return `
            <div class="certifications-list">
                <div class="certification-item">
                    <div class="certification-title editable" data-module="${module.id}" data-field="certName">${module.certName || '计算机二级证书'}</div>
                    <div class="certification-issuer editable" data-module="${module.id}" data-field="issuer">${module.issuer || '教育部考试中心'}</div>
                    <div class="certification-date editable" data-module="${module.id}" data-field="certDate">${module.certDate || '2018年3月'}</div>
                </div>
                <div class="certification-item">
                    <div class="certification-title editable" data-module="${module.id}" data-field="certName2">${module.certName2 || 'CET-6'}</div>
                    <div class="certification-issuer editable" data-module="${module.id}" data-field="issuer2">${module.issuer2 || '教育部考试中心'}</div>
                    <div class="certification-date editable" data-module="${module.id}" data-field="certDate2">${module.certDate2 || '2017年6月'}</div>
                </div>
            </div>
        `;
    }

    // 添加模块
    addModule(type) {
        if (!this.isAuthenticated || !this.isEditMode) return;
        
        const newModule = {
            id: this.generateId(),
            type: type,
            title: this.getModuleDefaultTitle(type)
        };
        
        this.resumeData.modules.push(newModule);
        this.saveResumeData();
        this.renderResume();
    }

    // 删除模块
    removeModule(moduleId) {
        if (!this.isAuthenticated || !this.isEditMode) return;
        
        this.resumeData.modules = this.resumeData.modules.filter(module => module.id !== moduleId);
        this.saveResumeData();
        this.renderResume();
    }

    // 切换编辑模式
    toggleEditMode() {
        if (!this.isAuthenticated) return;
        
        this.isEditMode = !this.isEditMode;
        const resumeContainer = document.getElementById('resume');
        const toggleBtn = document.getElementById('toggleEditBtn');
        
        if (this.isEditMode) {
            resumeContainer.classList.add('edit-mode');
            toggleBtn.innerHTML = '<i class="fas fa-eye"></i> 预览模式';
            this.showEditPanel();
            this.hideEditEntry();
        } else {
            resumeContainer.classList.remove('edit-mode');
            toggleBtn.innerHTML = '<i class="fas fa-edit"></i> 编辑模式';
            this.hideEditPanel();
            this.showEditEntry();
        }
    }

    // 隐藏编辑面板
    hideEditPanel() {
        const editPanel = document.getElementById('editPanel');
        editPanel.style.display = 'none';
    }

    // 保存简历
    saveResume() {
        if (!this.isAuthenticated || !this.isEditMode) return;
        
        this.saveResumeData();
        this.showSuccessMessage('简历保存成功！');
    }

    // 显示成功消息
    showSuccessMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'success-message';
        messageEl.textContent = message;
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }

    // 生成唯一ID
    generateId() {
        return 'module_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // 加载简历数据
    loadResumeData() {
        const saved = localStorage.getItem('resumeData');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // 默认简历数据
        return {
            header: {
                name: '张三',
                title: '前端开发工程师',
                email: 'zhangsan@example.com',
                phone: '138-0013-8000',
                location: '北京市',
                github: 'github.com/zhangsan',
                linkedin: 'linkedin.com/in/zhangsan'
            },
            modules: [
                {
                    id: this.generateId(),
                    type: 'basic',
                    title: '基本信息',
                    birthday: '1995-01-01',
                    gender: '男',
                    education: '本科',
                    major: '计算机科学与技术'
                },
                {
                    id: this.generateId(),
                    type: 'skills',
                    title: '技能特长',
                    skill1: 'HTML5',
                    skill2: 'CSS3',
                    skill3: 'JavaScript',
                    skill4: 'React',
                    skill5: 'Vue',
                    skill6: 'Node.js',
                    skill7: 'Express',
                    skill8: 'MongoDB',
                    skill9: 'Git',
                    skill10: 'Webpack',
                    skill11: 'VS Code'
                }
            ]
        };
    }

    // 保存简历数据到本地存储
    saveResumeData() {
        // 从DOM中提取最新数据
        this.updateResumeDataFromDOM();
        localStorage.setItem('resumeData', JSON.stringify(this.resumeData));
    }

    // 从DOM更新简历数据
    updateResumeDataFromDOM() {
        // 更新头部信息
        const headerElements = document.querySelectorAll('[data-section="header"]');
        headerElements.forEach(el => {
            const field = el.dataset.field;
            this.resumeData.header[field] = el.textContent;
        });

        // 更新模块信息
        document.querySelectorAll('[data-module]').forEach(el => {
            const moduleId = el.dataset.module;
            const field = el.dataset.field;
            const module = this.resumeData.modules.find(m => m.id === moduleId);
            if (module) {
                module[field] = el.textContent;
            }
        });
    }
}

// 初始化应用
let resumeEditor;
window.addEventListener('DOMContentLoaded', () => {
    resumeEditor = new ResumeEditor();
});

// 辅助函数：小型按钮样式
const style = document.createElement('style');
style.textContent = `
    .btn-sm {
        padding: 6px 10px;
        font-size: 0.8rem;
    }
    
    .btn-sm i {
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style);