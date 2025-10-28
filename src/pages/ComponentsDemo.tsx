import { useState } from 'react';
import {
  Moon,
  Sun,
  Search,
  Mail,
  Lock,
  User,
  Settings,
  LogOut,
  Bell,
  HelpCircle,
  Plus,
  Edit,
  Share2,
  Download,
  Upload,
  Save,
  Home,
  Briefcase,
  Code,
} from 'lucide-react';
import {
  Button,
  Checkbox,
  Switch,
  RadioGroup,
  Input,
  Textarea,
  Select,
  Listbox,
  Combobox,
  Fieldset,
  DropdownMenu,
  Disclosure,
  Dialog,
  PopoverWrapper,
  Tabs,
} from '../components/ui';
import TableDemo from './TableDemo';

export default function ComponentsDemo() {
  const [darkMode, setDarkMode] = useState(false);
  const [checked, setChecked] = useState(false);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const countries = [
    { value: '', label: '请选择国家' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'canada', label: 'Canada' },
    { value: 'china', label: 'China' },
  ];

  const cities = [
    { value: 'ny', label: 'New York', description: 'The Big Apple' },
    { value: 'sf', label: 'San Francisco', description: 'Golden Gate City' },
    { value: 'la', label: 'Los Angeles', description: 'City of Angels' },
    { value: 'chicago', label: 'Chicago', description: 'The Windy City' },
  ];

  const frameworks = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid.js' },
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                UI 组件库完整演示
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                现代化 · 科技感 · 扁平化设计
              </p>
            </div>
            <Button
              variant="outline"
              leftIcon={darkMode ? <Sun size={18} /> : <Moon size={18} />}
              onClick={toggleDarkMode}
            >
              {darkMode ? '亮色' : '暗色'}
            </Button>
          </div>

          <Tabs
            variant="underline"
            items={[
              {
                label: 'Forms',
                icon: <Edit size={16} />,
                content: (
                  <div className="space-y-8">
                    {/* Buttons */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Buttons 按钮
                      </h2>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                          <Button variant="primary">Primary</Button>
                          <Button variant="secondary">Secondary</Button>
                          <Button variant="success">Success</Button>
                          <Button variant="warning">Warning</Button>
                          <Button variant="danger">Danger</Button>
                          <Button variant="ghost">Ghost</Button>
                          <Button variant="outline">Outline</Button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Button size="sm" leftIcon={<Plus size={14} />}>
                            Small
                          </Button>
                          <Button size="md" leftIcon={<Save size={16} />}>
                            Medium
                          </Button>
                          <Button size="lg" leftIcon={<Download size={18} />}>
                            Large
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <Button loading>Loading</Button>
                          <Button disabled>Disabled</Button>
                        </div>
                      </div>
                    </section>

                    {/* Inputs */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Inputs 输入框
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="用户名"
                          placeholder="请输入用户名"
                          leftIcon={<User size={18} />}
                        />
                        <Input
                          label="邮箱地址"
                          type="email"
                          placeholder="example@email.com"
                          leftIcon={<Mail size={18} />}
                        />
                        <Input
                          label="密码"
                          type="password"
                          placeholder="请输入密码"
                          leftIcon={<Lock size={18} />}
                        />
                        <Input
                          label="搜索"
                          placeholder="搜索内容..."
                          variant="filled"
                          leftIcon={<Search size={18} />}
                        />
                        <Input
                          label="错误示例"
                          error="此字段为必填项"
                          placeholder="请输入内容"
                        />
                        <Input
                          label="禁用状态"
                          disabled
                          placeholder="禁用输入框"
                        />
                      </div>
                    </section>

                    {/* Textarea */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Textarea 文本域
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Textarea
                          label="描述"
                          placeholder="请输入详细描述..."
                          description="最多500字符"
                        />
                        <Textarea
                          label="备注"
                          placeholder="请输入备注..."
                          variant="filled"
                          resize="none"
                        />
                      </div>
                    </section>

                    {/* Checkbox & Switch */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Checkbox & Switch 复选框和开关
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            Checkbox
                          </h3>
                          <Checkbox
                            checked={checked}
                            onChange={setChecked}
                            label="我同意服务条款"
                            description="阅读并同意我们的服务条款和隐私政策"
                          />
                          <Checkbox label="接收营销邮件" size="sm" />
                          <Checkbox label="启用通知" size="lg" />
                          <Checkbox label="禁用选项" disabled />
                        </div>
                        <div className="space-y-3">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            Switch
                          </h3>
                          <Switch
                            checked={switchEnabled}
                            onChange={setSwitchEnabled}
                            label="启用功能"
                            description="开启此功能以获得更多选项"
                          />
                          <Switch label="自动保存" size="sm" />
                          <Switch label="双因素认证" size="lg" />
                          <Switch label="禁用选项" disabled />
                        </div>
                      </div>
                    </section>

                    {/* Radio Group */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Radio Group 单选框组
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <RadioGroup
                          label="选择订阅方案"
                          options={[
                            {
                              value: 'option1',
                              label: '免费版',
                              description: '基础功能，适合个人使用',
                            },
                            {
                              value: 'option2',
                              label: '专业版',
                              description: '¥99/月，解锁高级功能',
                            },
                            {
                              value: 'option3',
                              label: '企业版',
                              description: '¥299/月，无限制使用',
                            },
                          ]}
                        />
                        <RadioGroup
                          label="选择主题"
                          value="light"
                          onChange={() => { }}
                          orientation="horizontal"
                          options={[
                            { value: 'light', label: '亮色' },
                            { value: 'dark', label: '暗色' },
                            { value: 'auto', label: '自动' },
                          ]}
                        />
                      </div>
                    </section>

                    {/* Select & Listbox */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Select & Listbox 选择器
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select
                          label="原生选择器"
                          options={countries}
                          value={selectedCountry}
                          onChange={(e) => setSelectedCountry(e.target.value)}
                        />
                        <Listbox
                          label="自定义选择器"
                          options={cities}
                          placeholder="选择城市"
                        />
                        <Combobox
                          label="可搜索选择器"
                          options={frameworks}
                          placeholder="搜索框架..."
                        />
                      </div>
                    </section>

                    {/* Fieldset */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Fieldset 字段集
                      </h2>
                      <Fieldset
                        legend="个人信息"
                        description="请填写您的个人基本信息"
                      >
                        <Input label="姓名" placeholder="请输入姓名" />
                        <Input
                          label="邮箱"
                          type="email"
                          placeholder="请输入邮箱"
                        />
                        <Textarea label="个人简介" placeholder="介绍一下自己..." />
                      </Fieldset>
                    </section>
                  </div>
                ),
              },
              {
                label: 'Components',
                icon: <Code size={16} />,
                content: (
                  <div className="space-y-8">
                    {/* Disclosure */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Disclosure 折叠面板
                      </h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            默认样式
                          </h3>
                          <Disclosure title="什么是 React？" defaultOpen>
                            React 是一个用于构建用户界面的 JavaScript
                            库。它由 Facebook 开发和维护，广泛应用于现代 Web 应用开发。
                          </Disclosure>
                          <Disclosure title="什么是 TypeScript？">
                            TypeScript 是 JavaScript
                            的超集，添加了可选的静态类型和基于类的面向对象编程。
                          </Disclosure>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            边框样式
                          </h3>
                          <Disclosure title="如何使用组件？" variant="bordered">
                            导入组件后，可以直接在 JSX 中使用。组件支持多种属性配置。
                          </Disclosure>
                          <Disclosure title="支持哪些主题？" variant="bordered">
                            支持亮色和暗色两种主题，可以自动切换。
                          </Disclosure>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            填充样式
                          </h3>
                          <Disclosure title="性能如何？" variant="filled">
                            所有组件都经过优化，使用 Framer Motion
                            实现流畅动画，不影响性能。
                          </Disclosure>
                        </div>
                      </div>
                    </section>

                    {/* Tabs */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Tabs 标签页
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            默认样式
                          </h3>
                          <Tabs
                            items={[
                              {
                                label: '首页',
                                icon: <Home size={16} />,
                                content: (
                                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <p className="text-gray-700 dark:text-gray-300">
                                      欢迎使用我们的 UI 组件库！
                                    </p>
                                  </div>
                                ),
                              },
                              {
                                label: '项目',
                                icon: <Briefcase size={16} />,
                                content: (
                                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <p className="text-gray-700 dark:text-gray-300">
                                      这里显示您的项目列表。
                                    </p>
                                  </div>
                                ),
                              },
                              {
                                label: '设置',
                                icon: <Settings size={16} />,
                                content: (
                                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <p className="text-gray-700 dark:text-gray-300">
                                      配置您的偏好设置。
                                    </p>
                                  </div>
                                ),
                              },
                            ]}
                          />
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            药丸样式
                          </h3>
                          <Tabs
                            variant="pills"
                            items={[
                              {
                                label: 'HTML',
                                content: (
                                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <code className="text-sm text-gray-700 dark:text-gray-300">
                                      超文本标记语言
                                    </code>
                                  </div>
                                ),
                              },
                              {
                                label: 'CSS',
                                content: (
                                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <code className="text-sm text-gray-700 dark:text-gray-300">
                                      层叠样式表
                                    </code>
                                  </div>
                                ),
                              },
                              {
                                label: 'JavaScript',
                                content: (
                                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <code className="text-sm text-gray-700 dark:text-gray-300">
                                      编程语言
                                    </code>
                                  </div>
                                ),
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </section>

                    {/* Dropdown Menu */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Dropdown Menu 下拉菜单
                      </h2>
                      <div className="flex gap-4">
                        <DropdownMenu
                          trigger={
                            <Button variant="outline" rightIcon={<Settings size={16} />}>
                              设置
                            </Button>
                          }
                          sections={[
                            {
                              heading: '账户',
                              items: [
                                {
                                  label: '个人资料',
                                  icon: <User size={16} />,
                                  onClick: () => alert('个人资料'),
                                },
                                {
                                  label: '设置',
                                  icon: <Settings size={16} />,
                                  onClick: () => alert('设置'),
                                },
                              ],
                            },
                            {
                              items: [
                                {
                                  label: '退出登录',
                                  icon: <LogOut size={16} />,
                                  destructive: true,
                                  onClick: () => alert('退出登录'),
                                },
                              ],
                            },
                          ]}
                        />

                        <DropdownMenu
                          trigger={
                            <Button variant="primary" rightIcon={<Plus size={16} />}>
                              新建
                            </Button>
                          }
                          sections={[
                            {
                              items: [
                                {
                                  label: '新建项目',
                                  icon: <Plus size={16} />,
                                  onClick: () => alert('新建项目'),
                                },
                                {
                                  label: '导入项目',
                                  icon: <Upload size={16} />,
                                  onClick: () => alert('导入项目'),
                                },
                                {
                                  label: '从模板创建',
                                  icon: <Share2 size={16} />,
                                  onClick: () => alert('从模板创建'),
                                },
                              ],
                            },
                          ]}
                        />
                      </div>
                    </section>

                    {/* Dialog */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Dialog 对话框
                      </h2>
                      <Button onClick={() => setDialogOpen(true)}>打开对话框</Button>
                      <Dialog
                        open={dialogOpen}
                        onClose={() => setDialogOpen(false)}
                        title="确认删除"
                        description="此操作无法撤销，确定要继续吗？"
                        size="md"
                        footer={
                          <>
                            <Button
                              variant="ghost"
                              onClick={() => setDialogOpen(false)}
                            >
                              取消
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => {
                                alert('已删除');
                                setDialogOpen(false);
                              }}
                            >
                              确认删除
                            </Button>
                          </>
                        }
                      >
                        <p className="text-gray-600 dark:text-gray-400">
                          删除后，所有相关数据将被永久移除。
                        </p>
                      </Dialog>
                    </section>

                    {/* Popover */}
                    <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        Popover 气泡卡片
                      </h2>
                      <div className="flex gap-4">
                        <PopoverWrapper
                          trigger={
                            <Button variant="outline" leftIcon={<HelpCircle size={16} />}>
                              帮助
                            </Button>
                          }
                        >
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                              需要帮助？
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              查看我们的文档或联系支持团队。
                            </p>
                            <Button size="sm" variant="primary" className="w-full">
                              查看文档
                            </Button>
                          </div>
                        </PopoverWrapper>

                        <PopoverWrapper
                          trigger={
                            <Button variant="ghost" leftIcon={<Bell size={16} />}>
                              通知
                            </Button>
                          }
                        >
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                              通知中心
                            </h3>
                            <div className="space-y-2">
                              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                                <p className="font-medium text-gray-900 dark:text-white">
                                  新消息
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                  您有3条未读消息
                                </p>
                              </div>
                            </div>
                          </div>
                        </PopoverWrapper>
                      </div>
                    </section>
                  </div>
                ),
              },
              {
                label: 'Table',
                icon: <Code size={16} />,
                content: (<TableDemo />)
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
