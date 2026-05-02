'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AnimatePresence, motion } from 'motion/react';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { PhoneFormInput } from '@/components/common/input/PhoneFormInput';
import { FormOtpInput } from '@/components/common/input/FormOtpInput';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, Phone, Smartphone } from 'lucide-react';
import { useChangePhone } from '@/hooks/query/user/use-change-phone';
import { useGenerateOtp } from '@/hooks/query/auth/use-otp';
import { useAuth } from '@/components/provider/AuthProvider';
import { useTranslation } from '@/i18n';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type Step = 1 | 2;

export function ChangePhoneForm() {
  const t = useTranslation();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const { mutateAsync: changePhone, isPending: isChangingPhone } =
    useChangePhone();
  const { mutateAsync: sendOtp, isPending: isSendingOtp } = useGenerateOtp();

  const changePhoneSchema = z.object({
    phone: z.object({
      prefix: z.string(),
      phone: z.string().refine((val) => /^\d{5,14}$/.test(val), {
        message: t.authValidation.enterPhone,
      }),
    }),
    otp: z.string().min(1, t.authValidation.invalidCode),
  });

  type ChangePhoneFormData = z.infer<typeof changePhoneSchema>;

  const form = useForm<ChangePhoneFormData>({
    resolver: zodResolver(changePhoneSchema),
    defaultValues: {
      phone: { prefix: '+995', phone: '' },
      otp: '',
    },
  });

  const handleSendOtp = async () => {
    const phoneValue = form.getValues('phone');
    try {
      await sendOtp({
        phone: { prefix: phoneValue.prefix, number: phoneValue.phone },
      });
      toast.success(t.auth.otpSent);
    } catch {
      toast.error(t.common.error);
    }
  };

  const handleNext = async () => {
    const valid = await form.trigger(['phone']);
    if (!valid) return;

    const next = form.getValues('phone');
    if (
      user?.phone &&
      user.phone.prefix === next.prefix &&
      user.phone.number === next.phone
    ) {
      form.setError('phone', {
        type: 'manual',
        message: t.profile.phoneSameAsCurrent,
      });
      return;
    }

    setStep(2);
    handleSendOtp();
  };

  const handleBack = () => setStep(1);

  const onSubmit = async (data: ChangePhoneFormData) => {
    try {
      await changePhone({
        phone: { prefix: data.phone.prefix, number: data.phone.phone },
        otp: data.otp,
      });
      form.reset();
      setOpen(false);
      setStep(1);
    } catch (error) {
      console.error('Change phone error:', error);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      form.reset();
      setStep(1);
    }
    setOpen(next);
  };

  const isPending = isChangingPhone;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'w-full urbancare-rounded-3xl overflow-hidden bg-surface-variant',
          'flex items-center gap-2 px-4 py-3 text-left',
          'shadow-sm shadow-shadow/5',
          'transition-colors duration-200 cursor-pointer',
          'lg:hover:bg-surface-hover'
        )}
      >
        <div className="w-10 h-10 urbancare-rounded-xl bg-primary-container text-primary-container-foreground flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5" />
        </div>
        <h3 className="flex-1 font-semibold urbancare-text-base text-text-primary leading-tight-georgian truncate">
          {t.profile.changePhone}
        </h3>
        <ChevronRight className="w-5 h-5 text-text-tertiary shrink-0" />
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="border-border bg-surface max-w-lg p-0 overflow-hidden gap-0">
          <DialogTitle></DialogTitle>

          {/* Header */}
          <div className="px-4 py-3 bg-surface-variant border-b border-border flex items-center gap-2">
            {step === 2 && (
              <button
                type="button"
                onClick={handleBack}
                className="w-9 h-9 urbancare-rounded-lg flex items-center justify-center text-text-secondary lg:hover:bg-surface-hover lg:hover:text-text-primary transition-colors"
                aria-label={t.common.goBack}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="w-10 h-10 urbancare-rounded-xl bg-primary-container text-primary-container-foreground flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-semibold urbancare-text-base text-text-primary leading-tight-georgian">
              {t.profile.changePhone}
            </h3>
          </div>

          {/* Step indicator */}
          <div className="px-5 pt-4 flex justify-center">
            <div className="flex items-center gap-2 w-full max-w-52">
              <StepDot active label="1" />
              <div
                className={cn(
                  'h-0.5 flex-1 urbancare-rounded-full transition-colors duration-300',
                  step === 2 ? 'bg-primary' : 'bg-border'
                )}
              />
              <StepDot active={step === 2} label="2" />
            </div>
          </div>

          <div className="px-5 pt-4 pb-5 overflow-hidden">
            <Form {...form}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (step === 1) handleNext();
                  else form.handleSubmit(onSubmit)(e);
                }}
                className="space-y-3"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {step === 1 ? (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="space-y-3"
                    >
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <PhoneFormInput
                                placeholder={t.auth.phone}
                                disabled={isPending}
                                value={field.value.phone}
                                onChange={field.onChange}
                                className="h-[48px] sm:h-[52px] border-border bg-surface urbancare-text-lg text-text-primary placeholder:text-text-muted lg:hover:border-border-hover focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-200"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full h-12 urbancare-rounded-lg disabled:bg-disabled disabled:text-disabled-foreground"
                      >
                        {t.profile.changePhone}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="space-y-4"
                    >
                      <p className="urbancare-text-sm text-text-muted text-center flex items-center justify-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 shrink-0" />
                        {isSendingOtp ? t.common.sending : t.auth.otpDescription}
                      </p>

                      <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <FormOtpInput
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                maxLength={6}
                                disabled={isPending}
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full h-12 urbancare-rounded-lg disabled:bg-disabled disabled:text-disabled-foreground"
                        disabled={isPending || !form.formState.isValid}
                      >
                        {isPending
                          ? t.common.inProgress
                          : t.auth.verifyAndSignIn}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function StepDot({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className={cn(
        'w-6 h-6 urbancare-rounded-full flex items-center justify-center urbancare-text-xs font-bold transition-colors duration-300',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-surface-variant text-text-tertiary'
      )}
    >
      {label}
    </span>
  );
}
