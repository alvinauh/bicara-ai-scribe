
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  FolderOpen, 
  Search, 
  Plus, 
  FileEdit, 
  Presentation, 
  FileUp, 
  Trash2,
  FileDown,
  Book 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ThemeToggle";

const Notes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  
  const mockNotes = [
    {
      id: "note-1",
      title: "Product Meeting",
      date: "Today",
      excerpt: "Discussed new features for the Q3 roadmap...",
      language: "en",
      tags: ["product", "meeting"],
      folder: "Work"
    },
    {
      id: "note-2",
      title: "Perbincangan Tim Pemasaran",
      date: "Yesterday",
      excerpt: "Membincangkan strategi pemasaran untuk pelancaran produk...",
      language: "ms",
      tags: ["marketing", "team"],
      folder: "Work"
    },
    {
      id: "note-3",
      title: "客户回馈会议",
      date: "Apr 20, 2025",
      excerpt: "讨论了客户对新功能的反馈以及下一步计划...",
      language: "zh",
      tags: ["customer", "feedback"],
      folder: "Clients"
    },
    {
      id: "note-4",
      title: "Weekly Team Sync",
      date: "Apr 18, 2025",
      excerpt: "Discussed current projects and blockers...",
      language: "en",
      tags: ["team", "weekly"],
      folder: "Work"
    },
    {
      id: "note-5",
      title: "Meeting with Professor Tan",
      date: "Apr 15, 2025",
      excerpt: "Discussed thesis proposal and next steps...",
      language: "en",
      tags: ["education", "thesis"],
      folder: "School"
    },
    {
      id: "note-6",
      title: "Kelas Bahasa Melayu",
      date: "Apr 10, 2025",
      excerpt: "Nota tentang tatabahasa dan penggunaan kata kerja...",
      language: "ms",
      tags: ["education", "language"],
      folder: "School"
    },
  ];

  const folders = [
    { id: "all", name: "All Notes", count: mockNotes.length },
    { id: "work", name: "Work", count: mockNotes.filter(n => n.folder === "Work").length },
    { id: "school", name: "School", count: mockNotes.filter(n => n.folder === "School").length },
    { id: "clients", name: "Clients", count: mockNotes.filter(n => n.folder === "Clients").length },
  ];

  // Filter notes based on search query and language
  const filteredNotes = mockNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         note.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = languageFilter === "all" || note.language === languageFilter;
    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="space-y-6 animate-fade-in dark:text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold">Your Notes</h1>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          <Button onClick={() => navigate("/notes/new")}>
            <Plus size={16} className="mr-2" />
            New Note
          </Button>
          <Button variant="outline">
            <FileUp size={16} className="mr-2" />
            Import
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <Card className="dark:border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Folders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pb-0">
              {folders.map(folder => (
                <Button 
                  key={folder.id}
                  variant="ghost" 
                  className="w-full justify-start"
                >
                  <FolderOpen size={16} className="mr-2" />
                  <span className="flex-1 text-left">{folder.name}</span>
                  <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full">
                    {folder.count}
                  </span>
                </Button>
              ))}
            </CardContent>
            <CardFooter className="pt-2">
              <Button variant="ghost" className="w-full justify-start text-bicaraBlue-600 dark:text-bicaraBlue-400" size="sm">
                <Plus size={14} className="mr-2" />
                Add Folder
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Search notes..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                value={languageFilter} 
                onValueChange={setLanguageFilter}
              >
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ms">Bahasa Melayu</SelectItem>
                  <SelectItem value="zh">Mandarin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="grid">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
                </p>
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredNotes.map((note) => (
                    <Card key={note.id} className="border-gray-200 hover:border-bicaraBlue-300 transition-all cursor-pointer dark:border-gray-700 dark:hover:border-bicaraBlue-600"
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
                        <div className="flex flex-wrap gap-2 mt-2">
                          {note.tags.map(tag => (
                            <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-between">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon">
                            <FileEdit size={14} />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Presentation size={14} />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileDown size={14} />
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

                  <Card className="border-dashed border-gray-300 hover:border-bicaraBlue-300 transition-all cursor-pointer flex items-center justify-center h-[200px] dark:border-gray-600 dark:hover:border-bicaraBlue-600"
                    onClick={() => navigate("/notes/new")}>
                    <CardContent className="flex flex-col items-center p-6">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 mb-2">
                        <Plus size={20} className="text-gray-400 dark:text-gray-500" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Create New Note</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="list" className="mt-4">
                <div className="space-y-2">
                  {filteredNotes.map((note) => (
                    <div key={note.id} 
                      className="flex items-center justify-between p-3 border rounded-md hover:border-bicaraBlue-300 cursor-pointer transition-all dark:border-gray-700 dark:hover:border-bicaraBlue-600"
                      onClick={() => navigate(`/notes/${note.id}`)}>
                      <div className="flex items-center">
                        <div className="mr-3 text-gray-500 dark:text-gray-400">
                          {note.language === 'zh' ? (
                            <Book size={20} />
                          ) : (
                            <FileText size={20} />
                          )}
                        </div>
                        <div>
                          <h3 className={`font-medium ${note.language === 'zh' ? 'lang-zh' : note.language === 'ms' ? 'lang-ms' : 'lang-en'}`}>
                            {note.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>{note.date}</span>
                            <span>•</span>
                            <span>{note.folder}</span>
                            <span>•</span>
                            <span className="uppercase">{note.language}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon">
                          <FileEdit size={14} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Presentation size={14} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <FileDown size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-bicaraRed-500">
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
