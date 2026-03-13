'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/provider/AuthProvider';
import { Plus } from 'lucide-react';
import { useTranslation } from '@/i18n';

const AddContactButton = () => {
  const { isManager } = useAuth();
  const t = useTranslation();

  if (!isManager) return null;

  return (
    <Button className="m-4">
      <Plus className="w-4 h-4" />
      {t.info.addContact}
    </Button>
  );
};

export default AddContactButton;
