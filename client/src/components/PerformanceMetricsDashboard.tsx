import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, 
  PieChart, Pie, Cell, ResponsiveContainer, XAxis, 
  YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { formatCurrency } from "@/lib/utils";
import { 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  Clock,
  Users,
  Star,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Sample data for charts - in a real app this would come from your API
const performanceData = [
  { month: 'Jan', app: 1200, web: 900, consulting: 500 },
  { month: 'Feb', app: 1900, web: 1200, consulting: 700 },
  { month: 'Mar', app: 800, web: 1400, consulting: 1200 },
  { month: 'Apr', app: 1600, web: 1000, consulting: 900 },
  { month: 'May', app: 2100, web: 1500, consulting: 1300 },
  { month: 'Jun', app: 1800, web: 1700, consulting: 1400 },
  { month: 'Jul', app: 2400, web: 1800, consulting: 1100 },
];

const satisfactionData = [
  { name: 'Very Satisfied', value: 55 },
  { name: 'Satisfied', value: 30 },
  { name: 'Neutral', value: 10 },
  { name: 'Unsatisfied', value: 5 },
];

const projectProgressData = [
  { name: 'Research', completed: 100, total: 100 },
  { name: 'Design', completed: 85, total: 100 },
  { name: 'Development', completed: 65, total: 100 },
  { name: 'Testing', completed: 40, total: 100 },
  { name: 'Deployment', completed: 20, total: 100 },
];

const deadlineData = [
  { name: 'On Time', value: 85 },
  { name: 'Delayed', value: 15 },
];

// Colors for the charts
const COLORS = ['#7C3AED', '#3B82F6', '#10B981', '#F59E0B', '#EF4444'];
const REVENUE_COLORS = {
  app: '#7C3AED',
  web: '#3B82F6',
  consulting: '#10B981'
};

const PerformanceMetricsDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [viewType, setViewType] = useState<'chart' | 'table'>('chart');
  
  // Stats cards data
  const statsCards = [
    {
      title: "Total Revenue",
      value: "$148,500",
      change: "+12.5%",
      isPositive: true,
      icon: <Activity className="w-4 h-4" />
    },
    {
      title: "Projects Completed",
      value: "24",
      change: "+3",
      isPositive: true,
      icon: <CheckCircle2 className="w-4 h-4" />
    },
    {
      title: "Client Retention",
      value: "94%",
      change: "+2.1%",
      isPositive: true,
      icon: <Users className="w-4 h-4" />
    },
    {
      title: "Avg. Project Duration",
      value: "47 days",
      change: "-3 days",
      isPositive: true,
      icon: <Clock className="w-4 h-4" />
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Performance Dashboard</h2>
        <div className="flex space-x-2">
          <Select value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="bg-primary-800 rounded-md flex overflow-hidden">
            <Button 
              variant={viewType === 'chart' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewType('chart')}
            >
              <BarChartIcon className="h-4 w-4 mr-1" />
              Charts
            </Button>
            <Button 
              variant={viewType === 'table' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewType('table')}
            >
              <LineChartIcon className="h-4 w-4 mr-1" />
              Tables
            </Button>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  stat.isPositive ? 'bg-green-100/10 text-green-500' : 'bg-red-100/10 text-red-500'
                }`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className={stat.isPositive ? 'text-green-500' : 'text-red-500'}>
                  {stat.isPositive ? <ArrowUpRight className="h-3 w-3 inline mr-1" /> : <ArrowDownRight className="h-3 w-3 inline mr-1" />}
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs previous period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="revenue">
        <TabsList className="mb-4">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="client">Client Satisfaction</TabsTrigger>
          <TabsTrigger value="projects">Project Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Service</CardTitle>
              <CardDescription>
                Breakdown of revenue from different service categories
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              {viewType === 'chart' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, '']}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="app" stackId="1" stroke={REVENUE_COLORS.app} fill={REVENUE_COLORS.app} name="App Development" />
                    <Area type="monotone" dataKey="web" stackId="1" stroke={REVENUE_COLORS.web} fill={REVENUE_COLORS.web} name="Web Development" />
                    <Area type="monotone" dataKey="consulting" stackId="1" stroke={REVENUE_COLORS.consulting} fill={REVENUE_COLORS.consulting} name="Consulting" />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full overflow-auto">
                  <table className="min-w-full divide-y divide-primary-700">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 text-left">Month</th>
                        <th className="py-2 px-4 text-right">App Dev</th>
                        <th className="py-2 px-4 text-right">Web Dev</th>
                        <th className="py-2 px-4 text-right">Consulting</th>
                        <th className="py-2 px-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {performanceData.map((entry, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-primary-800/50' : ''}>
                          <td className="py-2 px-4">{entry.month}</td>
                          <td className="py-2 px-4 text-right">{formatCurrency(entry.app)}</td>
                          <td className="py-2 px-4 text-right">{formatCurrency(entry.web)}</td>
                          <td className="py-2 px-4 text-right">{formatCurrency(entry.consulting)}</td>
                          <td className="py-2 px-4 text-right font-medium">
                            {formatCurrency(entry.app + entry.web + entry.consulting)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="client">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Satisfaction</CardTitle>
                <CardDescription>
                  Client satisfaction ratings from recent projects
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Client Reviews</CardTitle>
                <CardDescription>
                  Latest feedback from our clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary-800/50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">MedTech Solutions</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Appzila delivered our healthcare app with exceptional attention to detail and security. Their team was responsive and professional throughout the project."
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary-800/50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">GlobalBank Inc.</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`h-4 w-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-primary-600'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Great experience working with Appzila on our banking portal redesign. The team was highly skilled and delivered on time."
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-primary-800/50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">TechCorp Enterprises</div>
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <Star className="h-4 w-4 text-primary-600" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Appzila's development team created a robust enterprise solution that streamlined our operations. Minor delays but overall excellent work."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="projects">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Current Project Progress</CardTitle>
                  <CardDescription>
                    Status of active project milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {projectProgressData.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{item.name}</span>
                          <span>{`${item.completed}%`}</span>
                        </div>
                        <Progress value={item.completed} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Deadline Adherence</CardTitle>
                <CardDescription>
                  Project completion rate relative to deadlines
                </CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deadlineData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      <Cell fill="#10B981" />
                      <Cell fill="#EF4444" />
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-muted-foreground">
                Based on last 20 completed projects
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
    </div>
  );
};

export default PerformanceMetricsDashboard;