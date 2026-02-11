'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/provider/AuthProvider';
import { Plus } from 'lucide-react';

const AddContactButton = () => {
  const { isManager } = useAuth();

  if (!isManager) return null;

  return (
    <Button className="m-4">
      <Plus className="w-4 h-4" />
      კონტაქტის დამატება
    </Button>
  );
};

export default AddContactButton;
