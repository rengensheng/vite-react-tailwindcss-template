import {
  Popover as HeadlessPopover,
  PopoverButton as HeadlessPopoverButton,
  PopoverPanel as HeadlessPopoverPanel,
} from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

// Re-export for use in other components
export { HeadlessPopover as Popover, HeadlessPopoverButton as PopoverButton, HeadlessPopoverPanel as PopoverPanel };

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export function PopoverWrapper({ trigger, children, placement = 'bottom' }: PopoverProps) {
  return (
    <HeadlessPopover className="relative">
      {({ open }) => (
        <>
          <HeadlessPopoverButton as="div">
            {trigger}
          </HeadlessPopoverButton>

          <AnimatePresence>
            {open && (
              <HeadlessPopoverPanel
                static
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                anchor={placement === 'bottom' ? 'bottom start' : placement === 'top' ? 'top start' : undefined}
                className="
                  z-150 w-80
                  bg-white dark:bg-gray-800
                  border-2 border-gray-200 dark:border-gray-700
                  rounded-lg shadow-xl
                  p-4
                "
              >
                {children}
              </HeadlessPopoverPanel>
            )}
          </AnimatePresence>
        </>
      )}
    </HeadlessPopover>
  );
}
