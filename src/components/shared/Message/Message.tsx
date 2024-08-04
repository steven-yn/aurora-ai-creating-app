import React, { PropsWithChildren } from 'react';
import { Avatar, AvatarProps, Card, CardBody } from '@nextui-org/react';
import { cn } from '@/utils/cn';
import { messageVariants } from './Message.style';

interface Props extends AvatarProps {
  speaker: 'me' | 'aurora';
}

const Message = ({ children, speaker, ...rest }: PropsWithChildren<Props>) => {
  const src = speaker === 'aurora' ? '/aurora.webp' : '';
  const name = speaker === 'aurora' ? 'Aurora' : 'Me';

  return (
    <div className={cn('', messageVariants({ speaker }))}>
      <Avatar src={src} name={name} {...rest} />
      <Card className="w-fit">
        <CardBody>
          <p>{children}</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Message;
