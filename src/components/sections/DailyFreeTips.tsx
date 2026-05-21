'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { Button } from '@/components/ui/Button';
import { Eye, TrendingUp } from 'lucide-react';

const featuredTips = [
  {
    id: 1,
    league: 'EPL',
    teams: 'Manchester City vs Arsenal',
    prediction: 'Over 2.5 Goals',
    confidence: 85,
    odds: 1.95,
    analysis: 'Both teams in excellent attacking form. City averaging 2.8 goals/game, Arsenal 2.5.',
    stats: '5 of last 6 meetings had 3+ goals',
  },
  {
    id: 2,
    league: 'La Liga',
    teams: 'Real Madrid vs Barcelona',
    prediction: 'Home Win',
    confidence: 72,
    odds: 2.10,
    analysis: 'Madrid unbeaten at home in last 12 matches. Barca missing key defenders.',
    stats: 'Madrid: 8W, 2D in home matches',
  },
  {
    id: 3,
    league: 'NPFL',
    teams: 'Kaizer Chiefs vs Orlando Pirates',
    prediction: 'Both Teams Score',
    confidence: 78,
    odds: 1.88,
    analysis: 'Fierce rivalry with attacking threats on both sides. Recent H2H supports prediction.',
    stats: '4 of last 5 meetings: Both Scored',
  },
];

export default function DailyFreeTips() {
  return (
    <>
      <SectionDivider />
      <section className="w-full bg-gradient-to-b from-primary-navy via-primary-navy-dark to-primary-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-white mb-2">Today's Free Tips</h2>
                <p className="text-lg text-neutral-text-secondary">
                  Premium predictions available to all users, updated daily
                </p>
              </div>
              <Badge variant="gold" className="hidden sm:flex">🔄 Updated Today</Badge>
            </div>
          </div>

          {/* Tips Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {featuredTips.map((tip, index) => (
              <div
                key={tip.id}
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full flex flex-col gap-5 hover:border-primary-cyan/50 hover:shadow-glow-lg transition-all duration-300 relative overflow-hidden">
                  {/* Glow background on hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-blue/0 via-primary-cyan/10 to-primary-gold/0 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10"></div>

                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="default" className="mb-2">
                        {tip.league}
                      </Badge>
                      <p className="font-bold text-neutral-white text-sm">{tip.teams}</p>
                    </div>
                    <Eye size={18} className="text-neutral-text-secondary" />
                  </div>

                  {/* Prediction & Odds */}
                  <div className="bg-primary-navy-dark/50 rounded-lg p-4 border border-primary-blue/20">
                    <p className="text-neutral-text-secondary text-xs mb-1">PREDICTION</p>
                    <div className="flex items-baseline gap-3">
                      <p className="text-2xl font-bold text-primary-cyan">{tip.prediction}</p>
                      <span className="text-primary-gold font-semibold">{tip.odds} odds</span>
                    </div>
                  </div>

                  {/* Confidence */}
                  <ConfidenceBar confidence={tip.confidence} />

                  {/* Analysis */}
                  <div>
                    <p className="text-sm text-neutral-text-secondary mb-2">{tip.analysis}</p>
                    <p className="text-xs text-primary-cyan font-semibold">📊 {tip.stats}</p>
                  </div>

                  {/* Action */}
                  <Button variant="outline" size="sm" className="w-full mt-auto group/btn">
                    <span className="flex items-center justify-center gap-2">
                      Add to Slip
                      <TrendingUp size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Card>
              </div>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center">
            <Button size="lg" variant="primary">
              View All Daily Tips →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
