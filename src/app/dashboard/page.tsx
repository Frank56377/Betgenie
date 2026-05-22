'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatCard } from '@/components/ui/StatCard';
import { Users, Eye, TrendingUp, DollarSign } from 'lucide-react';

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-neutral-white mb-2">Dashboard</h2>
        <p className="text-neutral-text-secondary">Welcome back! Here's your betting overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon="📊" label="Win Rate" value="78%" change={5.2} />
        <StatCard icon="💰" label="Total Profit" value="₦125,640" change={12.5} />
        <StatCard icon="🎯" label="Total Predictions" value="156" change={8.3} />
        <StatCard icon="🔥" label="This Month" value="₦45,230" change={18.7} />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-xl font-bold text-neutral-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button variant="primary" className="w-full">View Today's Tips</Button>
            <Button variant="outline" className="w-full">Build Accumulator</Button>
            <Button variant="outline" className="w-full">View Community</Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-bold text-neutral-white mb-4">Your Plan</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-neutral-text-secondary">Current Plan</span>
              <Badge variant="gold">PREMIUM</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-text-secondary">Renews on</span>
              <span className="text-neutral-white font-semibold">June 15, 2026</span>
            </div>
            <Button variant="outline" className="w-full mt-4">Upgrade to Elite</Button>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-neutral-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-primary-navy-dark/50 rounded-lg">
            <div>
              <p className="text-neutral-white font-semibold">Manchester City vs Arsenal - Over 2.5</p>
              <p className="text-sm text-neutral-text-secondary">Won ✓ • May 22, 2026</p>
            </div>
            <span className="text-primary-cyan font-bold">+₦1,950</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-primary-navy-dark/50 rounded-lg">
            <div>
              <p className="text-neutral-white font-semibold">Kaizer Chiefs vs Sundowns - Home Win</p>
              <p className="text-sm text-neutral-text-secondary">Won ✓ • May 21, 2026</p>
            </div>
            <span className="text-primary-cyan font-bold">+₦4,200</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-primary-navy-dark/50 rounded-lg">
            <div>
              <p className="text-neutral-white font-semibold">Barcelona vs Real Madrid - Draw</p>
              <p className="text-sm text-neutral-text-secondary">Lost ✗ • May 20, 2026</p>
            </div>
            <span className="text-status-error font-bold">-₦2,000</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
