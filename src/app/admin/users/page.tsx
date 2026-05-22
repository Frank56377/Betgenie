'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BarChart3, Users, Eye, TrendingUp, Trash2 } from 'lucide-react';

const allUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    tier: 'PREMIUM',
    joinDate: '2024-05-15',
    winRate: 78,
    totalBets: 156,
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    tier: 'ELITE',
    joinDate: '2024-03-20',
    winRate: 82,
    totalBets: 234,
    status: 'active',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    tier: 'FREE',
    joinDate: '2024-06-10',
    winRate: 65,
    totalBets: 45,
    status: 'inactive',
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(allUsers);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'ELITE':
        return 'bg-primary-gold/20 text-primary-gold';
      case 'PREMIUM':
        return 'bg-primary-blue/20 text-primary-blue';
      default:
        return 'bg-primary-cyan/20 text-primary-cyan';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-neutral-white mb-2">User Management</h2>
        <p className="text-neutral-text-secondary">Manage all platform users</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <Users className="text-primary-cyan mb-3" size={24} />
          <p className="text-neutral-text-secondary text-sm mb-1">Total Users</p>
          <p className="text-3xl font-bold text-neutral-white">{users.length}</p>
        </Card>
        <Card className="p-6">
          <TrendingUp className="text-status-success mb-3" size={24} />
          <p className="text-neutral-text-secondary text-sm mb-1">Active Users</p>
          <p className="text-3xl font-bold text-neutral-white">{users.filter(u => u.status === 'active').length}</p>
        </Card>
        <Card className="p-6">
          <BarChart3 className="text-primary-gold mb-3" size={24} />
          <p className="text-neutral-text-secondary text-sm mb-1">Premium Users</p>
          <p className="text-3xl font-bold text-neutral-white">{users.filter(u => u.tier !== 'FREE').length}</p>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-neutral-white mb-4">All Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary-blue/20">
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text-secondary">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text-secondary">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text-secondary">Tier</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text-secondary">Join Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text-secondary">Win Rate</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text-secondary">Bets</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-primary-blue/10 hover:bg-primary-navy-dark/50 transition-colors">
                  <td className="px-4 py-4 text-sm font-semibold text-neutral-white">{user.name}</td>
                  <td className="px-4 py-4 text-sm text-neutral-text-secondary">{user.email}</td>
                  <td className="px-4 py-4 text-sm">
                    <Badge variant="default" className={getTierColor(user.tier)}>
                      {user.tier}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-neutral-text-secondary">{user.joinDate}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-primary-cyan">{user.winRate}%</td>
                  <td className="px-4 py-4 text-sm text-neutral-white">{user.totalBets}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="sm">
                        <Eye size={18} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 size={18} className="text-status-error" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
