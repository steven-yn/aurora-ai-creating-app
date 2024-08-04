import { cva } from 'class-variance-authority';

export const messageVariants = cva('flex flex-col gap-1', {
  variants: {
    speaker: {
      aurora: '',
      me: 'items-end',
    },
  },
});
