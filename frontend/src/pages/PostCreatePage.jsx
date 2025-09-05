import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { useCreatePostMutation } from '../hooks/useCreatePostMutation';

function PostCreatePage() {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const editorRef = useRef(null);

  const { mutate: createMutate } = useCreatePostMutation();

  const handleSubmitForm = async e => {
    e.preventDefault();

    const editorContent = editorRef.current
      ? editorRef.current.getContent().trim()
      : '';

    if (!editorContent) {
      alert('내용을 입력해주세요.');
      editorRef.current.focus();
      return;
    }

    const postData = {
      title: titleRef.current.value,
      content: editorContent,
    };

    createMutate(postData);
  };

  return (
    <div className='mt-15 space-y-10'>
      <h1 className='text-left text-xl font-bold md:text-2xl lg:text-3xl'>
        글쓰기
      </h1>

      <form className='space-y-4 sm:space-y-8' onSubmit={handleSubmitForm}>
        <div>
          <label
            htmlFor='title'
            className='mb-2 block text-lg font-medium text-gray-700 sm:text-xl'
          >
            제목
          </label>
          <input
            type='text'
            id='title'
            ref={titleRef}
            className='mt-1 block w-full rounded-lg border border-gray-300 p-2 text-base shadow-sm focus:border-blue-500 sm:p-3 sm:text-lg'
            required
            placeholder='제목을 입력해주세요.'
          />
        </div>

        <div>
          <label
            htmlFor='content'
            className='mb-2 block text-lg font-medium text-gray-700 sm:text-xl'
          >
            내용
          </label>
          <Editor
            required
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=''
            init={{
              height: 500,
              menubar: true,
              toolbar_mode: 'scrolling',
              toolbar_sticky: true,
              toolbar_location: 'top',
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
                'image',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic | alignleft aligncenter ' +
                'alignright | bullist numlist | ' +
                'image | help',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } @media (max-width: 768px) { body { font-size: 16px; } }',
              file_picker_types: 'image',
              automatic_uploads: true,
            }}
          />
        </div>
        <div className='space-x-4 text-right'>
          <button
            type='submit'
            className='rounded-lg border border-blue-500 px-3 py-1 text-sm hover:bg-blue-500 hover:text-white md:text-lg lg:text-xl'
          >
            등록
          </button>
          <button
            type='button'
            onClick={() => {
              navigate('/board');
            }}
            className='rounded-lg border border-gray-500 px-3 py-1 text-sm hover:bg-gray-500 hover:text-white md:text-lg lg:text-xl'
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default PostCreatePage;
