import PropTypes from 'prop-types'
import styles from './styles.module.scss'
import {
  FormikTextField,
  FormikSelect,
  FormikCheckbox,
  FormikAutocomplete
} from 'components/FormikField'
import { questionTypes } from '../../../../utils'
import { questionPriceHint, questionTypesHint, realPriceHint, realPriceStepperHint, realThemeHint, bagcatRealPriceTypeHint } from './hints'
import WithHint from './WithHint'
import Typography from '@mui/material/Typography'

FormFields.propTypes = {
  formik: PropTypes.object,
  submitting: PropTypes.bool
}
export default function FormFields({ formik, submitting }) {
  const fieldProps = {
    formik, disabled: submitting
  }

  const numberFieldProps = {
    ...fieldProps,
    type: 'number',
    InputProps: { inputProps: { min: 0, max: 4294967295 } }
  }

  return (
    <>
      <Typography variant='h6'>Информация о вопросе</Typography>
      <WithHint hint={questionPriceHint}>
        <FormikTextField name='price' label='Стоимость' {...numberFieldProps} />
      </WithHint>
      <WithHint hint={questionTypesHint}>
        <FormikSelect name='type' label='Тип вопроса' options={questionTypes} {...fieldProps} />
      </WithHint>
      {formik.values.type === 'cat' && <>
        <WithHint hint={realPriceHint}>
          <FormikTextField name='realprice' label='Настоящая стоимость вопроса' {...numberFieldProps} />
        </WithHint>
        <WithHint hint={realThemeHint}>
          <FormikTextField name='realtheme' label='Настоящая тема вопроса' {...fieldProps} />
        </WithHint>
      </>}
      {formik.values.type === 'bagcat' && <>
        <WithHint hint={realThemeHint}>
          <FormikTextField name='realtheme' label='Настоящая тема вопроса' {...fieldProps} />
        </WithHint>
        <WithHint hint={bagcatRealPriceTypeHint}>
          <FormikSelect
            name='questionPriceType'
            label='Как определяется стоимость вопроса'
            options={{
              'fixed': 'Фиксирована вами',
              'minMax': 'Выбором игрока из минимума и максимума стоимостей вопросов в раунде',
              'byPlayer': 'Игроком в фиксированном вами интервале и шагом'
            }}
            {...fieldProps}
          />
        </WithHint>
        {formik.values.questionPriceType === 'fixed' && <WithHint hint={realPriceHint}>
          <FormikTextField name='realprice' label='Настоящая стоимость вопроса' {...numberFieldProps} />
        </WithHint>}
        {formik.values.questionPriceType === 'byPlayer' && <WithHint hint={realPriceStepperHint}>
          <div className={styles.grouped}>
            <FormikTextField name='realpriceFrom' label='От' {...numberFieldProps} />
            <FormikTextField name='realpriceTo' label='До' {...numberFieldProps} />
            <FormikTextField name='realpriceStep' label='Шаг' {...numberFieldProps} />
          </div>
        </WithHint>}
      </>}
      {formik.values.type === 'bagcat' && <>
        <FormikCheckbox name='transferToSelf' label='Можно отдать вопрос себе' {...fieldProps} />
        <WithHint hint={<p>Если выбран вариант <b>Никогда</b>, то вопрос не задаётся, игроку просто перечисляется его стоимость</p>}>
          <FormikSelect
            name='detailsDisclosure'
            label='Когда узнается стоимость и тема'
            options={{
              'before': 'До передачи вопроса',
              'after': 'После передачи вопроса',
              'never': 'Никогда'
            }}
            {...fieldProps}
          />
        </WithHint>
      </>}
      <Typography variant='h6'>Ответы</Typography>
      <FormikAutocomplete
        name='correctAnswers'
        formik={formik}
        label='Правильные ответы'
        disabled={submitting}
      />
      <FormikAutocomplete
        name='incorrectAnswers'
        formik={formik}
        label='Неправильные ответы (необязательно)'
        disabled={submitting}
      />
    </>
  )
}
