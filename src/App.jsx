import { React, useState } from 'react'
import './App.css'
import { Formik } from 'formik';
import Logo from './assets/Logo'


const CustomAlert = ({ isSuccess, setIsSuccess }) => {

  return (
    <div className={isSuccess ? 'alert' : 'alert hidden'}>
      <div className='alert-content'>
      <div className='closebutton'> <button onClick={() => setIsSuccess(false)}> x </button> </div>
        <div className='alert-text'>Дякуємо за звернення! <br/> Ми зв`яжемося з вами найближчим часом</div>
      </div>
    </div>
  )
}


function App() {
  const [isSuccess, setIsSuccess] = useState(false)

  return (
    <main className='main-wrapper'>
      <CustomAlert isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
      <div className='form-wrapper'>
        <Logo className='logo'/>
        <div className='closebutton'> <button> x </button> </div>
        <Formik
          initialValues={{ userName: '', phone: '', email: '', category: '', message: '', agreements: false }}
          validate={
            values => {
              const errors = {};
              if (!values.userName) {
                errors.userName = 'Поле є обов\'язковим';
              } else if (values.userName.match(/\d/)) {
                errors.userName = 'Поле не повинно містити цифри';
              }

              if (values.phone.length < 10) {
                errors.phone = 'Номер телефону повинен містити не менше 10 цифр';
              }

              if (!values.email) {
                errors.email = 'Поле є обов\'язковим';
              }
              else if (!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(values.email)) {
                errors.email = 'Невірний формат електронної пошти';
              }

              if (!values.category) {
                errors.category = 'Вибір є обов\'язковим';
              }

              return errors;
            }}

          onSubmit={(values, actions) => {
            setTimeout(() => {
              setIsSuccess(true)
              actions.setSubmitting(false);
              actions.resetForm({
                values: {
                  userName: '',
                  phone: '',
                  email: '',
                  category: '',
                  message: '',
                  agreements: false
                }
              })
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            resetForm
          }) => (
            <form onSubmit={handleSubmit} className='form-container'>
              <div className='form-input-container'>
                <span>Як до вас звертатися? <span className='red-star'>*</span></span>
                <input
                  type="text"
                  name="userName"
                  placeholder="ПІБ"
                  className='form-input-styles'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                  required
                  minLength={3}
                />
                {errors.userName && touched.userName && <div className='error'>{errors.userName}</div>}
              </div>
              <div className='form-input-container'>
                <span>Ваш контактний номер телефону</span>
                <input
                  type='tel'
                  name="phone"
                  placeholder='Телефон'
                  className='form-input-styles'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
                {errors.phone && touched.phone && <div className='error'>{errors.phone}</div>}
              </div>
              <div className="form-input-container">
                <span>Ваша електронна пошта <span className='red-star'>*</span></span>
                <input
                  type="email"
                  name="email"
                  placeholder="Електронна пошта"
                  className='form-input-styles'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  required
                />
                {errors.email && touched.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="form-input-container">
                <span>Оберіть категорію звернення <span className='red-star'>*</span></span>
                <select
                  name="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='form-input-styles'
                  required
                  value={values.category}
                >
                  <option value="" label="Оберіть категорію" />
                  <option value="question" label="Питання" />
                  <option value="feedback" label="Відгук" />
                  <option value="suggestion" label="Пропозиція" />
                  <option value="complaint" label="Скарга" />
                  <option value="other" label="Інше" />
                </select>
                {errors.category && touched.category && <div className="error">{errors.category}</div>}
              </div>
              <div className="form-input-container">
                <span>Додаткова інформація щодо вашого звернення</span>
                <textarea 
                className='form-text-area'
                name='message'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.message}
                />
              </div>
              <div className="form-input-container flex-row" >
                <input
                  type='checkbox'
                  name='agreements'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.agreements}
                  required
                  style={{ width: '17px', height: '17px' }}
                />
                <div>Даю згоду на обробку персональних даних</div>
              </div>
              <div className="form-button-container">
                <button type="reset" onClick={resetForm}>Очистити</button>
                <button type="submit" disabled={isSubmitting || !values.agreements}>
                  Надіслати
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </main>
  )
}

export default App
