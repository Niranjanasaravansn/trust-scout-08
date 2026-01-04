import { useState } from 'react';
import { Search, User, Calendar, Users, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AccountData } from '@/types/analysis';

interface AnalysisFormProps {
  onAnalyze: (data: AccountData) => void;
  isLoading: boolean;
}

const AnalysisForm = ({ onAnalyze, isLoading }: AnalysisFormProps) => {
  const [formData, setFormData] = useState<AccountData>({
    username: '',
    accountAge: 0,
    followers: 0,
    following: 0,
    bioLength: 0,
    hasProfilePhoto: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(formData);
  };

  const handleInputChange = (field: keyof AccountData, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username Field */}
      <div className="space-y-2">
        <Label htmlFor="username" className="flex items-center gap-2 text-sm font-medium">
          <User className="w-4 h-4 text-primary" />
          Username
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter username to analyze"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
          className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
          required
        />
      </div>

      {/* Account Age Field */}
      <div className="space-y-2">
        <Label htmlFor="accountAge" className="flex items-center gap-2 text-sm font-medium">
          <Calendar className="w-4 h-4 text-primary" />
          Account Age (days)
        </Label>
        <Input
          id="accountAge"
          type="number"
          min="0"
          placeholder="e.g., 365"
          value={formData.accountAge || ''}
          onChange={(e) => handleInputChange('accountAge', parseInt(e.target.value) || 0)}
          className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
          required
        />
      </div>

      {/* Followers/Following Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="followers" className="flex items-center gap-2 text-sm font-medium">
            <Users className="w-4 h-4 text-primary" />
            Followers
          </Label>
          <Input
            id="followers"
            type="number"
            min="0"
            placeholder="0"
            value={formData.followers || ''}
            onChange={(e) => handleInputChange('followers', parseInt(e.target.value) || 0)}
            className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="following" className="flex items-center gap-2 text-sm font-medium">
            <Users className="w-4 h-4 text-primary" />
            Following
          </Label>
          <Input
            id="following"
            type="number"
            min="0"
            placeholder="0"
            value={formData.following || ''}
            onChange={(e) => handleInputChange('following', parseInt(e.target.value) || 0)}
            className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
            required
          />
        </div>
      </div>

      {/* Bio Length Field */}
      <div className="space-y-2">
        <Label htmlFor="bioLength" className="flex items-center gap-2 text-sm font-medium">
          <FileText className="w-4 h-4 text-primary" />
          Bio Length (characters)
        </Label>
        <Input
          id="bioLength"
          type="number"
          min="0"
          placeholder="e.g., 150"
          value={formData.bioLength || ''}
          onChange={(e) => handleInputChange('bioLength', parseInt(e.target.value) || 0)}
          className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
          required
        />
      </div>

      {/* Profile Photo Toggle */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/30">
        <Label htmlFor="hasProfilePhoto" className="flex items-center gap-2 text-sm font-medium cursor-pointer">
          <Image className="w-4 h-4 text-primary" />
          Profile Photo Available
        </Label>
        <Switch
          id="hasProfilePhoto"
          checked={formData.hasProfilePhoto}
          onCheckedChange={(checked) => handleInputChange('hasProfilePhoto', checked)}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading || !formData.username}
        className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground glow-effect transition-all duration-300"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Analyzing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Analyze Account
          </span>
        )}
      </Button>
    </form>
  );
};

export default AnalysisForm;
