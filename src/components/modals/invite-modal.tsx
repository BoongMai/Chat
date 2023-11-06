'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useOrigin } from '@/hooks/use-origin';
import { Check, Copy, RefreshCw } from 'lucide-react';
import axios from 'axios';

export const InviteModal = () => {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === 'invite';
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteLink = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen('invite', { server: response.data });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Invite Friends
          </DialogTitle>
          <div className='py-6'>
            <Label className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'>
              Server invite link
            </Label>
            <div className='flex items-center gap-x-2 mt-2'>
              <Input
                disabled={isLoading}
                value={inviteLink}
                className='bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0'
              />
              <Button disabled={isLoading} onClick={onCopy} size={'icon'}>
                {copied ? (
                  <Check className='w-4 h-4' />
                ) : (
                  <Copy className='w-4 h-4' />
                )}
              </Button>
            </div>
            <Button
              disabled={isLoading}
              variant={'link'}
              size={'sm'}
              onClick={onNew}
              className='text-sx text-zinc-500 mt-4 pl-0'
            >
              Generate a new link !
              <RefreshCw className='w-4 h-4 ml-2' />
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};