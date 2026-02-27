'use client';

import React, { useState } from 'react';
import { BarChart2, Check, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Props interface for the Poll component
 */
interface PollProps {
  /** Current poll options from form */
  pollOptions: string[];
  /** Callback to update poll options */
  onPollOptionsChange: (options: string[]) => void;
  /** Whether the poll mode is enabled */
  isPollMode: boolean;
  /** Callback to toggle poll mode */
  onPollModeToggle: () => void;
  /** Optional: Whether the form is being submitted */
  isDisabled?: boolean;
}

/**
 * Props interface for the EditableOption component
 */
interface EditableOptionProps {
  initialValue: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}

/**
 * EditableOption - Internal component for editing poll options
 */
const EditableOption = ({
  initialValue,
  onSave,
  onCancel,
}: EditableOptionProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    if (value.trim()) {
      onSave(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        autoFocus
      />
      <button
        type="button"
        onClick={handleSave}
        className="w-8 h-8 flex justify-center items-center bg-success hover:bg-success/90 rounded-full transition-colors"
        aria-label="Save option"
      >
        <Check size={18} className="text-success-foreground" />
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="w-8 h-8 flex justify-center items-center bg-error hover:bg-error/90 rounded-full transition-colors"
        aria-label="Cancel editing"
      >
        <X size={18} className="text-error-foreground" />
      </button>
    </div>
  );
};

/**
 * Poll Component - Manages poll creation UI and logic
 *
 * This component handles:
 * - Toggling poll mode on/off
 * - Adding, editing, and removing poll options
 * - Managing "allow others to add" setting
 */
export const Poll = ({
  pollOptions,
  onPollOptionsChange,
  isPollMode,
  onPollModeToggle,
  isDisabled = false,
}: PollProps) => {
  // Local UI state
  const [isAddingOption, setIsAddingOption] = useState(false);
  const [currentOption, setCurrentOption] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  /**
   * Adds a new poll option
   */
  const handleAddPollOption = () => {
    if (!currentOption.trim()) return;

    onPollOptionsChange([...pollOptions, currentOption.trim()]);
    setCurrentOption('');
    setIsAddingOption(false);
  };

  /**
   * Removes a poll option at the specified index
   */
  const handleRemovePollOption = (index: number) => {
    onPollOptionsChange(pollOptions.filter((_, i) => i !== index));
  };

  /**
   * Cancels adding a new option
   */
  const handleCancelAddOption = () => {
    setCurrentOption('');
    setIsAddingOption(false);
  };

  /**
   * Saves an edited option
   */
  const handleSaveEdit = (index: number, value: string) => {
    if (!value.trim()) return;

    const newOptions = [...pollOptions];
    newOptions[index] = value.trim();
    onPollOptionsChange(newOptions);
    setEditingIndex(null);
  };

  /**
   * Cancels editing an option
   */
  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  /**
   * Handles keyboard shortcuts for adding options
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPollOption();
    } else if (e.key === 'Escape') {
      handleCancelAddOption();
    }
  };

  return (
    <div className="space-y-3 bg-background">
      {/* Poll Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-foreground-disabled" />
          <span className="text-sm font-medium text-foreground-secondary">
            გამოკითხვა
          </span>
        </div>
        <Button
          type="button"
          variant={isPollMode ? 'default' : 'mobile-outline'}
          size="sm"
          onClick={onPollModeToggle}
          disabled={isDisabled}
          className="h-8"
        >
          {isPollMode ? 'გამორთვა' : 'დამატება'}
        </Button>
      </div>

      {/* Poll Content */}
      {isPollMode && (
        <div className="space-y-3 p-4 bg-surface-variant rounded-lg border border-border">
          {/* Existing options */}
          {pollOptions.length > 0 && (
            <div className="space-y-2">
              {pollOptions.map((option, index) =>
                editingIndex === index ? (
                  <EditableOption
                    key={index}
                    initialValue={option}
                    onSave={(value) => handleSaveEdit(index, value)}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <div
                    key={index}
                    onClick={() => !isDisabled && setEditingIndex(index)}
                    className="flex items-center justify-between p-2 bg-surface rounded-md border border-border cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <span className="text-sm text-foreground-secondary">
                      {index + 1}) {option}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePollOption(index);
                      }}
                      disabled={isDisabled}
                      className="p-1 hover:bg-surface-container rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={`Remove option ${index + 1}`}
                    >
                      <X className="w-4 h-4 text-foreground-tertiary" />
                    </button>
                  </div>
                )
              )}
            </div>
          )}

          {/* Add option input */}
          {isAddingOption ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={currentOption}
                onChange={(e) => setCurrentOption(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="ვარიანტის ტექსტი..."
                className="flex-1 px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                autoFocus
              />
              <button
                type="button"
                onClick={handleAddPollOption}
                className="w-8 h-8 flex justify-center items-center bg-success hover:bg-success/90 rounded-full transition-colors"
                aria-label="Add option"
              >
                <Check size={18} className="text-success-foreground" />
              </button>
              <button
                type="button"
                onClick={handleCancelAddOption}
                className="w-8 h-8 flex justify-center items-center bg-error hover:bg-error/90 rounded-full transition-colors"
                aria-label="Cancel adding option"
              >
                <X size={18} className="text-error-foreground" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddingOption(true)}
              disabled={isDisabled}
              className="flex items-center gap-2 w-full p-2 text-sm text-foreground-primary hover:text-foreground-secondary bg-surface rounded-md border border-dashed border-border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
              ვარიანტის დამატება
            </button>
          )}
        </div>
      )}
    </div>
  );
};
