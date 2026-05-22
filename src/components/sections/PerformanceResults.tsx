'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { StatCard } from '@/components/ui/StatCard';
import { TrendingUp, Target, Zap, Trophy } from 'lucide-react';

const stats = [
  {
    icon: '🎯',
    label: 'Win Rate',
    value: '78%',
    change: 5.2,
  },
  {
    icon: '📈',
    label: 'This Month',
    value: '+₦45,230',
    change: 12.5,
  },
  {
    icon: '⚡',
    label: 'Predictions',
    value: '1,247',
    change: 8.3,
  },
  {
    icon: '🏆',
    label: 'Top Performer',
    value: 'Muthoni_Pro',
    change: 156,
  },
];

const recentHits = [
  { date: 'Today', team: 'Liverpool vs Fulham', bet: 'Over 2.5 Goals', result: '✓ WON', odds: 1.85, payout: '₦9,250' },
  { date: 'Yesterday', team: 'Kaizer Chiefs vs Sundowns', bet: 'Home Win', result: '✓ WON', odds: 2.10, payout: '₦21,000' },
  { date: '2 days ago', team: 'Barcelona vs Real Sociedad', bet: 'Both Score', result: '✓ WON', odds: 1.72, payout: '₦8,600' },
  { date: '3 days ago', team: 'PSV vs Ajax', bet: 'Over 1.5 Goals', result: '✓ WON', odds: 1.45, payout: '₦4,350' },
];

export default function PerformanceResults() {
  return (
    <>
      <SectionDivider />
      <section className="w-full bg-gradient-to-b from-primary-navy via-primary-navy-dark to-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-white mb-4">Our Results Speak</h2>
            <p className="text-lg text-neutral-text-secondary max-w-2xl mx-auto">
              Live performance metrics from our community of winning bettors
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <StatCard {...stat} />
              </div>
            ))}
          </div>

          {/* Recent Hits */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold text-neutral-white mb-6">🔥 Recent Hits</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary-blue/20">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text-secondary">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text-secondary">Match</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text-secondary">Prediction</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text-secondary">Odds</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-text-secondary">Result</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-text-secondary">Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {recentHits.map((hit, index) => (
                    <tr
                      key={index}
                      className="border-b border-primary-blue/10 hover:bg-primary-navy-dark/50 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm text-neutral-text-secondary">{hit.date}</td>
                      <td className="px-4 py-4 text-sm font-medium text-neutral-white">{hit.team}</td>
                      <td className="px-4 py-4 text-sm">
                        <span className="inline-block px-2 py-1 rounded bg-primary-blue/20 text-primary-cyan">
                          {hit.bet}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-semibold text-primary-gold">{hit.odds}</td>
                      <td className="px-4 py-4 text-sm font-bold text-status-success">{hit.result}</td>
                      <td className="px-4 py-4 text-sm font-bold text-primary-cyan text-right">{hit.payout}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
