import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from '../App';
import { useImages, GalleryItem } from '../context/ImageContext';
import { Plus, Trash2, Save, RotateCcw, Image as ImageIcon, LogIn, LogOut, ShieldCheck, Upload, Loader2 } from 'lucide-react';
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, User, ref, uploadBytes, getDownloadURL, storage } from '../firebase';

export default function Dashboard() {
  const { lang, t } = useTranslation();
  const { galleryImages, mainImages, updateGalleryItem, deleteGalleryItem, updateMainImages, resetToDefaults, isLoading } = useImages();
  const [user, setUser] = useState<User | null>(null);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [newItem, setNewItem] = useState<Partial<GalleryItem>>({
    titleEn: '', titleRu: '',
    captionEn: '', captionRu: '',
    url: '',
    sectionEn: 'Bunny Girl Moments', sectionRu: 'Моменты в костюме зайчика'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleFileUpload = async (file: File, type: 'gallery' | 'main', key?: string) => {
    if (!file) return;
    const uploadId = key || 'new-item';
    setIsUploading(uploadId);
    try {
      const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      if (type === 'gallery') {
        setNewItem(prev => ({ ...prev, url }));
      } else if (type === 'main' && key) {
        await updateMainImages({ ...mainImages, [key]: url });
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(null);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleAdd = async () => {
    if (!newItem.url) return;
    const item: GalleryItem = {
      ...newItem as GalleryItem,
      id: Date.now(),
    };
    await updateGalleryItem(item);
    setNewItem({
      titleEn: '', titleRu: '',
      captionEn: '', captionRu: '',
      url: '',
      sectionEn: 'Bunny Girl Moments', sectionRu: 'Моменты в костюме зайчика'
    });
  };

  const isAdmin = user?.email === "suxa6462@gmail.com";

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl text-gradient">
            {lang === 'ru' ? 'Вход в панель' : 'Dashboard Login'}
          </h1>
          <p className="text-white/40 uppercase tracking-widest text-xs">
            {lang === 'ru' ? 'Требуется авторизация' : 'Authorization Required'}
          </p>
        </header>
        <button 
          onClick={handleLogin}
          className="flex items-center gap-3 px-8 py-4 glass hover:bg-white/10 rounded-2xl transition-all text-mai-beige"
        >
          <LogIn size={20} />
          {lang === 'ru' ? 'Войти через Google' : 'Login with Google'}
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center">
        <ShieldCheck size={64} className="text-red-400/50" />
        <div className="space-y-2">
          <h1 className="text-3xl text-mai-sunset">{lang === 'ru' ? 'Доступ ограничен' : 'Access Denied'}</h1>
          <p className="text-white/40 max-w-md">
            {lang === 'ru' 
              ? `Вы вошли как ${user.email}. Только администратор (suxa6462@gmail.com) может вносить изменения.` 
              : `Logged in as ${user.email}. Only the administrator (suxa6462@gmail.com) can make changes.`}
          </p>
        </div>
        <button onClick={handleLogout} className="text-xs text-mai-purple hover:underline">
          {lang === 'ru' ? 'Выйти' : 'Logout'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-4xl md:text-5xl text-gradient">
            {lang === 'ru' ? 'Панель управления' : 'Dashboard'}
          </h1>
          <p className="text-white/40 uppercase tracking-widest text-xs">
            {lang === 'ru' ? 'Облачная синхронизация активна' : 'Cloud Sync Active'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-white/40">{lang === 'ru' ? 'Админ' : 'Admin'}</p>
            <p className="text-xs text-mai-beige">{user.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-3 glass hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white"
            title={lang === 'ru' ? 'Выйти' : 'Logout'}
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Main Images */}
      <section className="glass p-8 rounded-2xl space-y-6">
        <h2 className="text-2xl font-serif text-mai-beige flex items-center gap-2">
          <ImageIcon size={24} />
          {lang === 'ru' ? 'Основные изображения сайта' : 'Main Site Images'}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {(Object.keys(mainImages) as Array<keyof typeof mainImages>).map((key) => (
            <div key={key} className="space-y-2">
              <label className="text-xs text-white/40 uppercase tracking-widest">{key}</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={mainImages[key]} 
                  onChange={e => updateMainImages({...mainImages, [key]: e.target.value})}
                  className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-mai-purple outline-none"
                />
                <label className="cursor-pointer p-2 glass hover:bg-white/10 rounded-lg transition-all text-mai-purple">
                  {isUploading === key ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'main', String(key))} 
                  />
                </label>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden bg-white/5 mt-2">
                <img src={mainImages[key]} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add New Item */}
      <section className="glass p-8 rounded-2xl space-y-6">
        <h2 className="text-2xl font-serif text-mai-beige flex items-center gap-2">
          <Plus size={24} />
          {lang === 'ru' ? 'Добавить новое изображение' : 'Add New Image'}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-2">
              <input 
                type="text" placeholder="URL" 
                className="flex-grow bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-mai-purple outline-none"
                value={newItem.url} onChange={e => setNewItem({...newItem, url: e.target.value})}
              />
              <label className="cursor-pointer p-2 glass hover:bg-white/10 rounded-lg transition-all text-mai-purple">
                {isUploading === 'new-item' ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'gallery')} 
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Title (EN)" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-mai-purple outline-none"
                value={newItem.titleEn} onChange={e => setNewItem({...newItem, titleEn: e.target.value})}
              />
              <input 
                type="text" placeholder="Заголовок (RU)" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-mai-purple outline-none"
                value={newItem.titleRu} onChange={e => setNewItem({...newItem, titleRu: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Caption (EN)" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-mai-purple outline-none"
                value={newItem.captionEn} onChange={e => setNewItem({...newItem, captionEn: e.target.value})}
              />
              <input 
                type="text" placeholder="Описание (RU)" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-mai-purple outline-none"
                value={newItem.captionRu} onChange={e => setNewItem({...newItem, captionRu: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" placeholder="Section (EN)" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-mai-purple outline-none"
                value={newItem.sectionEn} onChange={e => setNewItem({...newItem, sectionEn: e.target.value})}
              />
              <input 
                type="text" placeholder="Секция (RU)" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-mai-purple outline-none"
                value={newItem.sectionRu} onChange={e => setNewItem({...newItem, sectionRu: e.target.value})}
              />
            </div>
          </div>
        </div>
        <button 
          onClick={handleAdd}
          className="w-full py-3 bg-mai-purple/20 hover:bg-mai-purple/40 border border-mai-purple/30 rounded-xl transition-all flex items-center justify-center gap-2 text-mai-beige"
        >
          <Plus size={18} />
          {lang === 'ru' ? 'Добавить в галерею' : 'Add to Gallery'}
        </button>
      </section>

      {/* List Items */}
      <section className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-serif text-mai-beige">
            {lang === 'ru' ? 'Текущие изображения' : 'Current Images'}
          </h2>
          <button 
            onClick={resetToDefaults}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-mai-sunset transition-colors"
          >
            <RotateCcw size={14} />
            {lang === 'ru' ? 'Сбросить до стандартных' : 'Reset to Defaults'}
          </button>
        </div>

        <div className="grid gap-6">
          {galleryImages.map((img) => (
            <motion.div 
              key={img.id}
              layout
              className="glass p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center"
            >
              <div className="w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow grid md:grid-cols-2 gap-4 w-full">
                <div className="space-y-2">
                  <input 
                    type="text" value={img.url} 
                    onChange={e => updateGalleryItem({ ...img, url: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded px-2 py-1 text-xs focus:border-mai-purple outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" value={img.titleEn} 
                      onChange={e => updateGalleryItem({ ...img, titleEn: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded px-2 py-1 text-xs focus:border-mai-purple outline-none"
                    />
                    <input 
                      type="text" value={img.titleRu} 
                      onChange={e => updateGalleryItem({ ...img, titleRu: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded px-2 py-1 text-xs focus:border-mai-purple outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" value={img.sectionEn} 
                      onChange={e => updateGalleryItem({ ...img, sectionEn: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded px-2 py-1 text-xs focus:border-mai-purple outline-none"
                    />
                    <input 
                      type="text" value={img.sectionRu} 
                      onChange={e => updateGalleryItem({ ...img, sectionRu: e.target.value })}
                      className="w-full bg-white/5 border border-white/5 rounded px-2 py-1 text-xs focus:border-mai-purple outline-none"
                    />
                  </div>
                  <button 
                    onClick={() => deleteGalleryItem(img.id)}
                    className="flex items-center gap-2 text-xs text-red-400/60 hover:text-red-400 transition-colors pt-2"
                  >
                    <Trash2 size={14} />
                    {lang === 'ru' ? 'Удалить' : 'Delete'}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
