
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Presentation, FileEdit, Plus, Mic, Users } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const recentNotes = [
    {
      id: "note-1",
      title: "Product Meeting",
      date: "Today",
      excerpt: "Discussed new features for the Q3 roadmap...",
      language: "en"
    },
    {
      id: "note-2",
      title: "Perbincangan Tim Pemasaran",
      date: "Yesterday",
      excerpt: "Membincangkan strategi pemasaran untuk pelancaran produk...",
      language: "ms"
    },
    {
      id: "note-3",
      title: "客户回馈会议",
      date: "Apr 20, 2025",
      excerpt: "讨论了客户对新功能的反馈以及下一步计划...",
      language: "zh"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in dark:text-white">
      {/* Welcome section */}
      <div className="flex justify-between items-center">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold">Welcome, {user?.name || 'Student'}!</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your multilingual note-taking assistant is ready to help you capture meetings in English, Bahasa Melayu, and Mandarin.
          </p>
        </section>
        <ThemeToggle />
      </div>

      {/* Quick actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-bicaraBlue-50 border-bicaraBlue-200 hover:bg-bicaraBlue-100 transition-colors cursor-pointer
                         dark:bg-bicaraBlue-900/30 dark:border-bicaraBlue-800 dark:hover:bg-bicaraBlue-900/50"
          onClick={() => navigate("/notes/new")}>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-bicaraBlue-500 text-white p-3 rounded-full mb-4">
              <Mic size={24} />
            </div>
            <h3 className="font-medium text-lg mb-2">Record New Meeting</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Start recording a new meeting and let AI take notes for you.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-bicaraGreen-50 border-bicaraGreen-200 hover:bg-bicaraGreen-100 transition-colors cursor-pointer
                         dark:bg-bicaraGreen-900/30 dark:border-bicaraGreen-800 dark:hover:bg-bicaraGreen-900/50"
          onClick={() => navigate("/notes")}>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-bicaraGreen-500 text-white p-3 rounded-full mb-4">
              <FileText size={24} />
            </div>
            <h3 className="font-medium text-lg mb-2">Browse Notes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Access and manage your existing notes and recordings.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-bicaraRed-50 border-bicaraRed-200 hover:bg-bicaraRed-100 transition-colors cursor-pointer
                       dark:bg-bicaraRed-900/30 dark:border-bicaraRed-800 dark:hover:bg-bicaraRed-900/50"
          onClick={() => navigate("/pricing")}>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-bicaraRed-500 text-white p-3 rounded-full mb-4">
              <Users size={24} />
            </div>
            <h3 className="font-medium text-lg mb-2">Referral Program</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Invite friends and earn free access to premium features.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Recent notes */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Notes</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate("/notes")}>
            View all
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentNotes.map((note) => (
            <Card key={note.id} className="border-gray-200 hover:border-bicaraBlue-300 transition-all cursor-pointer
                                          dark:border-gray-700 dark:hover:border-bicaraBlue-600"
              onClick={() => navigate(`/notes/${note.id}`)}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className={`text-lg font-medium ${note.language === 'zh' ? 'lang-zh' : note.language === 'ms' ? 'lang-ms' : 'lang-en'}`}>
                    {note.title}
                  </CardTitle>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{note.date}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className={`text-sm text-gray-600 dark:text-gray-300 line-clamp-2 ${note.language === 'zh' ? 'lang-zh' : note.language === 'ms' ? 'lang-ms' : 'lang-en'}`}>
                  {note.excerpt}
                </p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <FileEdit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Presentation size={14} className="mr-1" />
                    Slides
                  </Button>
                </div>
                <div className="h-6 px-2 rounded bg-gray-100 dark:bg-gray-700 flex items-center">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    {note.language === 'en' ? 'EN' : note.language === 'ms' ? 'MS' : 'ZH'}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}

          <Card className="border-dashed border-gray-300 hover:border-bicaraBlue-300 transition-all cursor-pointer flex items-center justify-center h-[200px]
                          dark:border-gray-600 dark:hover:border-bicaraBlue-600"
            onClick={() => navigate("/notes/new")}>
            <CardContent className="flex flex-col items-center p-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 mb-2">
                <Plus size={20} className="text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Create New Note</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
