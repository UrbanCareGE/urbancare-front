'use client';

import * as React from 'react';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type LanguageSelectorProps = {
  className?: string;
};

const languages = [
  { code: 'ka', name: 'ქართული', flag: '🇬🇬' },
  { code: 'en', name: 'ინგლისური', flag: '🇬🇧' },
  { code: 'ru', name: 'რუსული', flag: '🇷🇺' },
];

export const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    console.log('Language changed to:', value);
  };

  return (
    <div className={cn('flex items-center gap-2 w-full', className)}>
      <div
        className={cn(
          'flex-shrink-0 transition-all duration-200 bg-gray-100 rounded-full p-2 flex justify-center items-center',
          'text-gray-500 group-hover:text-gray-400 mr-auto'
        )}
      >
        <Globe className={'text-primary'} />
      </div>
      <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-40 bg-gray-100">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent className={'bg-gray-100'}>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <span className="flex items-center gap-2 text-base text-center">
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
