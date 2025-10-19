import { useState } from 'react';
import { Button } from '../components/ui/Button';
import {
  Download,
  Plus,
  Trash2,
  Check,
  AlertTriangle,
  Send,
  Settings,
  Heart,
  Star,
  Moon,
  Sun
} from 'lucide-react';

export default function ButtonDemo() {
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                现代化UI组件库
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                科技感十足的扁平化设计 · Button组件展示
              </p>
            </div>
            <Button
              variant="outline"
              size="md"
              leftIcon={darkMode ? <Sun size={18} /> : <Moon size={18} />}
              onClick={toggleDarkMode}
            >
              {darkMode ? '亮色模式' : '暗色模式'}
            </Button>
          </div>

          <div className="space-y-12">
            {/* Variants Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-colors duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                按钮变体 (Variants)
              </h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </section>

            {/* Sizes Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-colors duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                按钮尺寸 (Sizes)
              </h2>
              <div className="flex flex-wrap items-end gap-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </section>

            {/* With Icons Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-colors duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                带图标按钮 (With Icons)
              </h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" leftIcon={<Download size={18} />}>
                    下载文件
                  </Button>
                  <Button variant="success" leftIcon={<Plus size={18} />}>
                    新建项目
                  </Button>
                  <Button variant="danger" leftIcon={<Trash2 size={18} />}>
                    删除
                  </Button>
                  <Button variant="warning" leftIcon={<AlertTriangle size={18} />}>
                    警告
                  </Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" rightIcon={<Send size={18} />}>
                    发送消息
                  </Button>
                  <Button variant="secondary" rightIcon={<Settings size={18} />}>
                    设置选项
                  </Button>
                  <Button variant="ghost" rightIcon={<Check size={18} />}>
                    确认操作
                  </Button>
                </div>
              </div>
            </section>

            {/* Loading State Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-colors duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                加载状态 (Loading State)
              </h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" loading={loading} onClick={handleLoadingDemo}>
                  提交表单
                </Button>
                <Button variant="success" loading>
                  处理中...
                </Button>
                <Button variant="secondary" loading size="sm">
                  保存
                </Button>
                <Button variant="outline" loading size="lg">
                  加载数据
                </Button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                点击"提交表单"按钮查看2秒加载动画效果
              </p>
            </section>

            {/* Disabled State Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-colors duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                禁用状态 (Disabled State)
              </h2>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" disabled>
                  Primary Disabled
                </Button>
                <Button variant="secondary" disabled>
                  Secondary Disabled
                </Button>
                <Button variant="success" disabled leftIcon={<Check size={18} />}>
                  Success Disabled
                </Button>
                <Button variant="danger" disabled leftIcon={<Trash2 size={18} />}>
                  Danger Disabled
                </Button>
                <Button variant="outline" disabled>
                  Outline Disabled
                </Button>
              </div>
            </section>

            {/* Interactive Examples Section */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transition-colors duration-300">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                交互示例 (Interactive Examples)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    操作卡片
                  </h3>
                  <div className="space-y-3">
                    <Button variant="primary" size="sm" className="w-full" leftIcon={<Star size={16} />}>
                      收藏
                    </Button>
                    <Button variant="outline" size="sm" className="w-full" leftIcon={<Heart size={16} />}>
                      点赞
                    </Button>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    确认对话框
                  </h3>
                  <div className="space-y-3">
                    <Button variant="success" size="sm" className="w-full">
                      确认
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full">
                      取消
                    </Button>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="p-6 bg-gradient-to-br from-red-50 to-rose-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    危险操作
                  </h3>
                  <div className="space-y-3">
                    <Button variant="danger" size="sm" className="w-full" leftIcon={<Trash2 size={16} />}>
                      删除账户
                    </Button>
                    <Button variant="secondary" size="sm" className="w-full">
                      我再想想
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Design Principles */}
            <section className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 rounded-2xl p-8 shadow-lg text-white">
              <h2 className="text-2xl font-semibold mb-4">设计原则</h2>
              <ul className="space-y-2 text-blue-50">
                <li>✓ 扁平化设计，简洁现代</li>
                <li>✓ 支持亮色/暗色主题自动切换</li>
                <li>✓ 流畅的动画效果，提升用户体验</li>
                <li>✓ 一致的视觉语言和交互状态</li>
                <li>✓ 可访问性优先，支持键盘导航</li>
                <li>✓ 基于 @headlessui/react 确保最佳实践</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
