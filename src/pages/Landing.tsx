
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Globe, LogIn } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:text-white">
      {/* Navigation */}
      <nav className="fixed w-full top-0 bg-white/80 backdrop-blur-sm border-b z-50 dark:bg-gray-900/80 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-bicaraBlue-800 dark:text-bicaraBlue-400">Bicara AI Scribe</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">
                  <Globe className="w-4 h-4 mr-2" />
                  Language
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem className="cursor-pointer">
                    English
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer">
                    Bahasa Melayu
                  </MenubarItem>
                  <MenubarItem className="cursor-pointer">
                    中文
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="font-medium"
            >
              Sign Up
            </Button>
            <Button 
              onClick={() => navigate("/login")}
              className="font-medium"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Log In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              AI-Powered Meeting Notes in Multiple Languages
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Transform your meetings with intelligent note-taking in English, Bahasa Melayu, and Mandarin. Let AI handle the documentation while you focus on the conversation.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/login")}
              className="text-lg px-8"
            >
              Get Started for Free
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Focus on Your Meeting, Let AI Take Notes
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our AI assistant captures and organizes your meeting notes in real-time, supporting multiple languages and generating summaries, action items, and even presentations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-bicaraBlue-100 dark:bg-bicaraBlue-900 flex items-center justify-center">
                    <span className="text-bicaraBlue-600 dark:text-bicaraBlue-300 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">Multilingual Support (English, BM, Mandarin)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-bicaraBlue-100 dark:bg-bicaraBlue-900 flex items-center justify-center">
                    <span className="text-bicaraBlue-600 dark:text-bicaraBlue-300 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">Convert Notes to Presentations & Essays</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="h-6 w-6 rounded-full bg-bicaraBlue-100 dark:bg-bicaraBlue-900 flex items-center justify-center">
                    <span className="text-bicaraBlue-600 dark:text-bicaraBlue-300 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200">Google Drive Integration</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2070"
                alt="Team meeting"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-bicaraBlue-600/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
