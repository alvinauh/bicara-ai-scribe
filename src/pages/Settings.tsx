
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Settings, User, Lock, Moon, Sun, Languages } from 'lucide-react';

// Define the plan type
type PlanType = "free" | "premium";

// Define plan constants to use in comparisons
const FREE_PLAN = "free" as PlanType;
const PREMIUM_PLAN = "premium" as PlanType;

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };
  
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    
    try {
      // Mock API call for profile update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(t('profile_success'));
    } catch (error) {
      toast.error(t('profile_error'));
      console.error('Error updating profile:', error);
    } finally {
      setIsUpdatingProfile(false);
    }
  };
  
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      // Mock API call for password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      
      toast.success(t('password_success'));
    } catch (error) {
      toast.error(t('password_error'));
      console.error('Error changing password:', error);
    } finally {
      setIsChangingPassword(false);
    }
  };
  
  // Define userPlan as PlanType for type safety
  const userPlan: PlanType = FREE_PLAN; // This would come from user data in a real app
  
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{t('settings')}</h1>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">{t('profile')}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden md:inline">{t('security')}</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden md:inline">{t('appearance')}</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Languages className="h-4 w-4" />
            <span className="hidden md:inline">{t('language')}</span>
          </TabsTrigger>
          <TabsTrigger value="plan" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">{t('plan')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{t('profile')}</CardTitle>
              <CardDescription>
                Update your personal information here.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')}</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    disabled
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isUpdatingProfile}>
                  {isUpdatingProfile ? t('saved') : t('update_profile')}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>{t('change_password')}</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handlePasswordSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">{t('current_password')}</Label>
                  <Input 
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">{t('new_password')}</Label>
                  <Input 
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmNewPassword">{t('confirm_new_password')}</Label>
                  <Input 
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    value={passwordForm.confirmNewPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isChangingPassword}>
                  {isChangingPassword ? t('saved') : t('change_password')}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>{t('appearance')}</CardTitle>
              <CardDescription>
                Customize how the application looks for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium text-base">{t('dark_mode')}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Turn on dark mode for a better viewing experience at night.
                  </p>
                </div>
                <Switch 
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle>{t('language')}</CardTitle>
              <CardDescription>
                Choose your preferred language for the application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup 
                value={language} 
                onValueChange={(value) => setLanguage(value as "en" | "zh" | "ms")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="en" />
                  <Label htmlFor="en">{t('english')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="zh" id="zh" />
                  <Label htmlFor="zh">{t('chinese')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ms" id="ms" />
                  <Label htmlFor="ms">{t('malay')}</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plan">
          <Card>
            <CardHeader>
              <CardTitle>{t('plan')}</CardTitle>
              <CardDescription>
                Manage your subscription plan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary">
                <h3 className="font-medium text-lg">
                  {t('current_plan')}: {userPlan === FREE_PLAN ? t('free_plan') : t('premium_plan')}
                </h3>
                {userPlan === FREE_PLAN && (
                  <Button className="mt-4" variant="default">
                    {t('upgrade_plan')}
                  </Button>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{t('free_plan')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold mb-4">$0/mo</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <span>✓</span> Basic features
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span> 10 questions per day
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span> Basic feedback
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {userPlan === FREE_PLAN ? (
                      <Button disabled variant="outline">Current Plan</Button>
                    ) : (
                      <Button variant="outline">Downgrade</Button>
                    )}
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{t('premium_plan')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold mb-4">$9.99/mo</p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <span>✓</span> All features
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span> Unlimited questions
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span> Advanced feedback
                      </li>
                      <li className="flex items-center gap-2">
                        <span>✓</span> Priority support
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {userPlan === PREMIUM_PLAN ? (
                      <Button disabled variant="outline">Current Plan</Button>
                    ) : (
                      <Button variant="default">Upgrade</Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
