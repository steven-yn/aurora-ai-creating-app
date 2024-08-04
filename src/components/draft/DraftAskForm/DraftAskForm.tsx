import { Card, CardBody, Textarea } from '@nextui-org/react';
import React from 'react';

const DraftAskForm = () => {
  return (
    <Card className="absolute bottom-0 w-full">
      <CardBody>
        <Textarea maxRows={6} label="텍스트를 입력하세요" />
      </CardBody>
    </Card>
  );
};

export default DraftAskForm;
