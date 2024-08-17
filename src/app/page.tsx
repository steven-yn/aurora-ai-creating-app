import DraftAskForm from '@/components/draft/DraftAskForm/DraftAskForm';
import Message from '@/components/shared/Message/Message';

export default async function Home() {
  // const res = await askToOpenAI('You are a helpful assistant.');

  return (
    <>
      <div className="flex flex-col gap-5 h-full pb-60">
        <Message speaker="aurora">
          안녕하세요? 오늘은 어떤 아이디어가 있으신가요?
        </Message>
        <Message speaker="me">제가 생각한 아이디어는...</Message>
        <Message speaker="aurora">
          안녕하세요? 오늘은 어떤 아이디어가 있으신가요?
        </Message>
        <Message speaker="me">제가 생각한 아이디어는...</Message>
        <Message speaker="aurora">
          안녕하세요? 오늘은 어떤 아이디어가 있으신가요?
        </Message>
        <Message speaker="me">제가 생각한 아이디어는...</Message>
        <Message speaker="aurora">
          안녕하세요? 오늘은 어떤 아이디어가 있으신가요?
        </Message>
        <Message speaker="me">제가 생각한 아이디어는...</Message>
        <Message speaker="aurora">
          안녕하세요? 오늘은 어떤 아이디어가 있으신가요?
        </Message>
        <Message speaker="me">제가 생각한 아이디어는...</Message>
        <Message speaker="aurora">
          안녕하세요? 오늘은 어떤 아이디어가 있으신가요?
        </Message>
        <Message speaker="me">제가 생각한 아이디어는...</Message>
      </div>
      <DraftAskForm />
    </>
  );
}
