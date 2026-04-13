import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, collection, doc, onSnapshot, setDoc, deleteDoc, query, orderBy, handleFirestoreError, OperationType } from '../firebase';

export interface GalleryItem {
  id: number;
  titleEn: string;
  titleRu: string;
  captionEn: string;
  captionRu: string;
  url: string;
  sectionEn: string;
  sectionRu: string;
  order?: number;
}

export interface MainImages {
  homeHero: string;
  bioPortrait: string;
  relationshipsHero: string;
  extraSyndrome: string;
}

const DEFAULT_IMAGES: GalleryItem[] = [
  { 
    id: 1, 
    titleEn: "The Library", titleRu: "Библиотека", 
    captionEn: "Where it all began. A silent plea for attention.", captionRu: "Где все началось. Тихая мольба о внимании.", 
    url: "https://static.wikia.nocookie.net/aobuta/images/5/5f/Mai_Bunny_Library.png?format=original",
    sectionEn: "Bunny Girl Moments", sectionRu: "Моменты в костюме зайчика"
  },
  { 
    id: 2, 
    titleEn: "Twilight Gaze", titleRu: "Взгляд в сумерках", 
    captionEn: "Looking out at a world that doesn't see her.", captionRu: "Взгляд на мир, который её не видит.", 
    url: "https://static.wikia.nocookie.net/aobuta/images/7/7a/Mai_Sakurajima_Bunny_Art.png?format=original",
    sectionEn: "Bunny Girl Moments", sectionRu: "Моменты в костюме зайчика"
  },
  { 
    id: 3, 
    titleEn: "Quiet Hallways", titleRu: "Тихие коридоры", 
    captionEn: "A normal student in an abnormal situation.", captionRu: "Обычная ученица в необычной ситуации.", 
    url: "https://static.wikia.nocookie.net/aobuta/images/3/3e/Mai_School_Uniform.png?format=original",
    sectionEn: "School Life", sectionRu: "Школьная жизнь"
  },
  { 
    id: 4, 
    titleEn: "Rooftop Breezes", titleRu: "Бриз на крыше", 
    captionEn: "Finding peace above the noise of the world.", captionRu: "Поиск покоя над шумом мира.", 
    url: "https://static.wikia.nocookie.net/aobuta/images/8/8d/Mai_School_Side.png?format=original",
    sectionEn: "School Life", sectionRu: "Школьная жизнь"
  },
  { 
    id: 5, 
    titleEn: "Rainy Reflections", titleRu: "Отражения в дожде", 
    captionEn: "When the weight of invisibility becomes too much.", captionRu: "Когда тяжесть невидимости становится невыносимой.", 
    url: "https://static.wikia.nocookie.net/aobuta/images/2/2b/Mai_Rain.png?format=original",
    sectionEn: "Emotional Scenes", sectionRu: "Эмоциональные сцены"
  },
  { 
    id: 6, 
    titleEn: "Fading Light", titleRu: "Угасающий свет", 
    captionEn: "A moment of vulnerability in the setting sun.", captionRu: "Момент уязвимости в лучах заходящего солнца.", 
    url: "https://static.wikia.nocookie.net/aobuta/images/6/6c/Mai_Sunset.png?format=original",
    sectionEn: "Emotional Scenes", sectionRu: "Эмоциональные сцены"
  },
  { 
    id: 7, 
    titleEn: "The Promise", titleRu: "Обещание", 
    captionEn: "A bond that transcends memory.", captionRu: "Связь, которая превосходит память.", 
    url: "https://static.wikia.nocookie.net/aobuta/images/9/9a/Mai_Sakuta_Train.png?format=original",
    sectionEn: "Romantic Moments", sectionRu: "Романтические моменты"
  },
  { 
    id: 8, 
    titleEn: "Warmth", titleRu: "Тепло", 
    captionEn: "Finding a home in someone else's heart.", captionRu: "Поиск дома в чужом сердце.", 
    url: "https://static.wikia.nocookie.net/aobuta/images/1/1d/Mai_Sakuta_Beach.png?format=original",
    sectionEn: "Romantic Moments", sectionRu: "Романтические моменты"
  }
];

const DEFAULT_MAIN_IMAGES: MainImages = {
  homeHero: "https://static.wikia.nocookie.net/aobuta/images/5/5f/Mai_Bunny_Library.png?format=original",
  bioPortrait: "https://static.wikia.nocookie.net/aobuta/images/3/3e/Mai_School_Uniform.png?format=original",
  relationshipsHero: "https://static.wikia.nocookie.net/aobuta/images/9/9a/Mai_Sakuta_Train.png?format=original",
  extraSyndrome: "https://static.wikia.nocookie.net/aobuta/images/5/5f/Mai_Bunny_Library.png?format=original"
};

interface ImageContextType {
  galleryImages: GalleryItem[];
  mainImages: MainImages;
  updateGalleryItem: (item: GalleryItem) => Promise<void>;
  deleteGalleryItem: (id: number) => Promise<void>;
  updateMainImages: (images: MainImages) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  isLoading: boolean;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [mainImages, setMainImages] = useState<MainImages>(DEFAULT_MAIN_IMAGES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to Gallery
    const q = query(collection(db, 'gallery'), orderBy('id', 'asc'));
    const unsubscribeGallery = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data() as GalleryItem);
      if (items.length === 0 && isLoading) {
        // If empty, we might want to initialize with defaults, but let's wait for first load
      }
      setGalleryImages(items.length > 0 ? items : DEFAULT_IMAGES);
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'gallery');
    });

    // Listen to Main Images Config
    const unsubscribeMain = onSnapshot(doc(db, 'config', 'mainImages'), (snapshot) => {
      if (snapshot.exists()) {
        setMainImages(snapshot.data() as MainImages);
      } else {
        setMainImages(DEFAULT_MAIN_IMAGES);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'config/mainImages');
    });

    return () => {
      unsubscribeGallery();
      unsubscribeMain();
    };
  }, []);

  const updateGalleryItem = async (item: GalleryItem) => {
    try {
      await setDoc(doc(db, 'gallery', item.id.toString()), item);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `gallery/${item.id}`);
    }
  };

  const deleteGalleryItem = async (id: number) => {
    try {
      await deleteDoc(doc(db, 'gallery', id.toString()));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `gallery/${id}`);
    }
  };

  const updateMainImages = async (images: MainImages) => {
    try {
      await setDoc(doc(db, 'config', 'mainImages'), images);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'config/mainImages');
    }
  };

  const resetToDefaults = async () => {
    try {
      // Reset Main Images
      await setDoc(doc(db, 'config', 'mainImages'), DEFAULT_MAIN_IMAGES);
      
      // Reset Gallery (this is a bit more complex, we'd need to delete all and re-add)
      // For simplicity, let's just clear and add defaults
      const snapshot = await getDocs(collection(db, 'gallery'));
      for (const d of snapshot.docs) {
        await deleteDoc(doc(db, 'gallery', d.id));
      }
      for (const item of DEFAULT_IMAGES) {
        await setDoc(doc(db, 'gallery', item.id.toString()), item);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'reset');
    }
  };

  return (
    <ImageContext.Provider value={{ 
      galleryImages, 
      mainImages, 
      updateGalleryItem, 
      deleteGalleryItem, 
      updateMainImages, 
      resetToDefaults,
      isLoading 
    }}>
      {children}
    </ImageContext.Provider>
  );
};

import { getDocs } from 'firebase/firestore';

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) throw new Error('useImages must be used within an ImageProvider');
  return context;
};
