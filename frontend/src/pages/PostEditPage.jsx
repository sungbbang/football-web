import { Editor } from '@tinymce/tinymce-react';
import React, { useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { postQuery } from '../query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useUser } from '../contexts/UserContext';
import { useEditPostMutation } from '../hooks/useEditPostMutation';

function PostEditPage() {
  const navigate = useNavigate();
  const { postId } = useLoaderData();
  const { data: postData } = useSuspenseQuery(postQuery(postId));
  const post = postData.result;
  const { user } = useUser();

  const [currentTitle, setCurrentTitle] = useState(post.title);
  const editorRef = useRef(null);

  const { mutate: editMutate } = useEditPostMutation(postId);

  const handleSubmitForm = async e => {
    e.preventDefault();

    if (user._id !== post.authorId) {
      alert('작성자가 아니라 권한이 없습니다.');
      navigate('/board', { replace: true });
      return;
    }

    const editorContent = editorRef.current.getContent();
    const editPostData = {
      title: currentTitle,
      content: editorContent,
    };

    editMutate(editPostData);
  };

  return (
    <div className='mt-15 space-y-10 px-4 sm:px-10'>
      <h1 className='text-left text-xl font-bold md:text-2xl lg:text-3xl'>
        글수정
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
            value={currentTitle}
            onChange={e => setCurrentTitle(e.target.value)}
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
            initialValue={post.content}
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
            수정
          </button>
          <button
            type='button'
            onClick={() => {
              alert('취소해 원래 게시글로 이동합니다.');
              navigate(`/board/${post._id}`, { replace: true });
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

export default PostEditPage;
