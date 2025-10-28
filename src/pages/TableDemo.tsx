import { useState } from 'react';
import { Table, createColumnHelper } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import {
  User,
  MapPin,
  Calendar,
  Briefcase,
  Star,
  RefreshCw,
  UserPlus,
  Trash2,
  Edit,
  Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';

// Define the data type
interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  location: string;
  salary: number;
  joinDate: string;
  rating: number;
  status: 'active' | 'inactive' | 'on-leave';
}

// Sample data
const generateEmployees = (): Employee[] => [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.j@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Engineering',
    position: 'Senior Developer',
    location: 'New York',
    salary: 125000,
    joinDate: '2020-03-15',
    rating: 4.8,
    status: 'active',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@company.com',
    phone: '+1 (555) 234-5678',
    department: 'Marketing',
    position: 'Marketing Manager',
    location: 'San Francisco',
    salary: 95000,
    joinDate: '2019-07-22',
    rating: 4.5,
    status: 'active',
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol.w@company.com',
    phone: '+1 (555) 345-6789',
    department: 'Engineering',
    position: 'Product Designer',
    location: 'Austin',
    salary: 98000,
    joinDate: '2021-01-10',
    rating: 4.9,
    status: 'active',
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david.b@company.com',
    phone: '+1 (555) 456-7890',
    department: 'Sales',
    position: 'Sales Representative',
    location: 'Chicago',
    salary: 75000,
    joinDate: '2022-05-18',
    rating: 4.2,
    status: 'on-leave',
  },
  {
    id: 5,
    name: 'Emma Davis',
    email: 'emma.d@company.com',
    phone: '+1 (555) 567-8901',
    department: 'HR',
    position: 'HR Manager',
    location: 'Boston',
    salary: 88000,
    joinDate: '2018-11-30',
    rating: 4.7,
    status: 'active',
  },
  {
    id: 6,
    name: 'Frank Miller',
    email: 'frank.m@company.com',
    phone: '+1 (555) 678-9012',
    department: 'Engineering',
    position: 'DevOps Engineer',
    location: 'Seattle',
    salary: 115000,
    joinDate: '2020-09-05',
    rating: 4.6,
    status: 'active',
  },
  {
    id: 7,
    name: 'Grace Wilson',
    email: 'grace.w@company.com',
    phone: '+1 (555) 789-0123',
    department: 'Finance',
    position: 'Financial Analyst',
    location: 'Denver',
    salary: 82000,
    joinDate: '2021-06-12',
    rating: 4.4,
    status: 'active',
  },
  {
    id: 8,
    name: 'Henry Moore',
    email: 'henry.m@company.com',
    phone: '+1 (555) 890-1234',
    department: 'Engineering',
    position: 'Junior Developer',
    location: 'Portland',
    salary: 72000,
    joinDate: '2023-02-28',
    rating: 4.1,
    status: 'active',
  },
  {
    id: 9,
    name: 'Ivy Taylor',
    email: 'ivy.t@company.com',
    phone: '+1 (555) 901-2345',
    department: 'Marketing',
    position: 'Content Writer',
    location: 'Miami',
    salary: 65000,
    joinDate: '2022-08-14',
    rating: 4.3,
    status: 'inactive',
  },
  {
    id: 10,
    name: 'Jack Anderson',
    email: 'jack.a@company.com',
    phone: '+1 (555) 012-3456',
    department: 'Sales',
    position: 'Sales Director',
    location: 'Los Angeles',
    salary: 135000,
    joinDate: '2017-04-20',
    rating: 4.9,
    status: 'active',
  },
  {
    id: 11,
    name: 'Kelly Thomas',
    email: 'kelly.t@company.com',
    phone: '+1 (555) 123-4568',
    department: 'Engineering',
    position: 'Tech Lead',
    location: 'San Diego',
    salary: 145000,
    joinDate: '2019-12-08',
    rating: 5.0,
    status: 'active',
  },
  {
    id: 12,
    name: 'Leo Jackson',
    email: 'leo.j@company.com',
    phone: '+1 (555) 234-5679',
    department: 'Operations',
    position: 'Operations Manager',
    location: 'Phoenix',
    salary: 92000,
    joinDate: '2020-07-15',
    rating: 4.5,
    status: 'active',
  },
  {
    id: 13,
    name: 'Maya White',
    email: 'maya.w@company.com',
    phone: '+1 (555) 345-6780',
    department: 'Marketing',
    position: 'Social Media Manager',
    location: 'Dallas',
    salary: 68000,
    joinDate: '2021-11-22',
    rating: 4.4,
    status: 'active',
  },
  {
    id: 14,
    name: 'Noah Harris',
    email: 'noah.h@company.com',
    phone: '+1 (555) 456-7891',
    department: 'Engineering',
    position: 'Full Stack Developer',
    location: 'Atlanta',
    salary: 108000,
    joinDate: '2020-10-30',
    rating: 4.7,
    status: 'active',
  },
  {
    id: 15,
    name: 'Olivia Martin',
    email: 'olivia.m@company.com',
    phone: '+1 (555) 567-8902',
    department: 'Customer Support',
    position: 'Support Lead',
    location: 'Nashville',
    salary: 76000,
    joinDate: '2019-05-18',
    rating: 4.6,
    status: 'active',
  },
];

// Status badge component
function StatusBadge({ status }: { status: Employee['status'] }) {
  const statusConfig = {
    active: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', label: '在职' },
    inactive: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', label: '离职' },
    'on-leave': { color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300', label: '休假中' },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
}

// Rating component
function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star size={14} className="text-amber-500 fill-amber-500" />
      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function TableDemo() {
  const [data, setData] = useState<Employee[]>(generateEmployees());
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);

  const columnHelper = createColumnHelper<Employee>();

  const columns = [
    columnHelper.accessor('name' as const, {
      header: '员工',
      cell: (info) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            {info.getValue().charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">{info.getValue()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{info.row.original.email}</div>
          </div>
        </div>
      ),
      size: 250,
    }),
    columnHelper.accessor('department' as const, {
      header: '部门',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-gray-400" />
          <span className="text-sm text-gray-900 dark:text-gray-100">{info.getValue()}</span>
        </div>
      ),
      size: 150,
    }),
    columnHelper.accessor('position' as const, {
      header: '职位',
      cell: (info) => (
        <span className="text-sm text-gray-900 dark:text-gray-100">{info.getValue()}</span>
      ),
      size: 180,
    }),
    columnHelper.accessor('location' as const, {
      header: '地点',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-400" />
          <span className="text-sm text-gray-900 dark:text-gray-100">{info.getValue()}</span>
        </div>
      ),
      size: 140,
    }),
    columnHelper.accessor('salary' as const, {
      header: '薪资',
      cell: (info) => (
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          ${info.getValue().toLocaleString()}
        </span>
      ),
      size: 120,
    }),
    columnHelper.accessor('joinDate' as const, {
      header: '入职日期',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          <span className="text-sm text-gray-900 dark:text-gray-100">
            {new Date(info.getValue()).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      ),
      size: 160,
    }),
    columnHelper.accessor('rating' as const, {
      header: '评分',
      cell: (info) => <Rating rating={info.getValue()} />,
      size: 100,
    }),
    columnHelper.accessor('status' as const, {
      header: '状态',
      cell: (info) => <StatusBadge status={info.getValue()} />,
      size: 100,
    }),
    columnHelper.display({
      id: 'actions',
      header: '操作',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => alert(`View ${row.original.name}`)}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="查看"
          >
            <Eye size={16} className="text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => alert(`Edit ${row.original.name}`)}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="编辑"
          >
            <Edit size={16} className="text-blue-600 dark:text-blue-400" />
          </button>
          <button
            onClick={() => {
              if (confirm(`Delete ${row.original.name}?`)) {
                setData((prev) => prev.filter((item) => item.id !== row.original.id));
              }
            }}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="删除"
          >
            <Trash2 size={16} className="text-red-600 dark:text-red-400" />
          </button>
        </div>
      ),
      size: 120,
      enableSorting: false,
      meta: { pinned: 'right' },
    }),
  ];

  const handleExport = (exportData: Employee[]) => {
    const csv = [
      ['Name', 'Email', 'Department', 'Position', 'Location', 'Salary', 'Join Date', 'Rating', 'Status'],
      ...exportData.map((row) => [
        row.name,
        row.email,
        row.department,
        row.position,
        row.location,
        row.salary,
        row.joinDate,
        row.rating,
        row.status,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    setData(generateEmployees());
  };

  const handleAddNew = () => {
    const newEmployee: Employee = {
      id: data.length + 1,
      name: 'New Employee',
      email: 'new@company.com',
      phone: '+1 (555) 000-0000',
      department: 'Engineering',
      position: 'Developer',
      location: 'Remote',
      salary: 80000,
      joinDate: new Date().toISOString().split('T')[0],
      rating: 4.0,
      status: 'active',
    };
    setData((prev) => [newEmployee, ...prev]);
  };

  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      alert('未选择任何行');
      return;
    }

    if (confirm(`确定要删除选中的 ${selectedRows.length} 位员工吗？`)) {
      const selectedIds = new Set(selectedRows.map((row) => row.id));
      setData((prev) => prev.filter((item) => !selectedIds.has(item.id)));
      setSelectedRows([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            员工管理系统
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            功能全面的表格组件，支持排序、筛选、分页和行选择
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <User size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">员工总数</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Briefcase size={24} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">在职</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {data.filter((e) => e.status === 'active').length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <MapPin size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">部门数</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(data.map((e) => e.department)).size}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Star size={24} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">平均评分</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(data.reduce((acc, e) => acc + e.rating, 0) / data.length).toFixed(1)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Table
            data={data}
            columns={columns as any}
            enableSorting
            enableFiltering
            enablePagination
            enableRowSelection
            enableColumnVisibility
            pageSize={10}
            pageSizeOptions={[5, 10, 15, 20, 50]}
            onRowSelectionChange={setSelectedRows}
            emptyMessage={
              <div className="text-center">
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-1">
                  未找到员工
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  请尝试调整搜索或筛选条件
                </p>
              </div>
            }
            actions={
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<UserPlus size={16} />}
                  onClick={handleAddNew}
                >
                  新增
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  leftIcon={<RefreshCw size={16} />}
                  onClick={handleRefresh}
                >
                  刷新
                </Button>
                {selectedRows.length > 0 && (
                  <Button
                    variant="danger"
                    size="sm"
                    leftIcon={<Trash2 size={16} />}
                    onClick={handleDeleteSelected}
                  >
                    删除 ({selectedRows.length})
                  </Button>
                )}
              </div>
            }
            exportable
            onExport={handleExport}
            striped
            hoverable // cspell:disable-line
            stickyHeader
            maxHeight="700px"
          />
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              高级功能
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                多列排序
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                全局搜索筛选
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                行选择与回调
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                列可见性切换
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              自定义选项
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                条纹行
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                悬停效果
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                紧凑模式
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                粘性表头
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
              性能优化
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                支持虚拟化渲染
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                高效分页
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                优化重渲染
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                流畅动画
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
