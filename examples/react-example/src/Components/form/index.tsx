// custom form-item child
// 测试生命周期

import { Button, Form, Input, InputNumber } from 'antd'
import { useForm, useWatch } from 'antd/es/form/Form'
import React, { MouseEvent, ReactNode, useCallback } from 'react'

interface FormModel {
  name: string
  age: number
}

// onChange?: (v: number) => void
const CustomInput = ({ value }: { value?: number }) => {
  const { status } = Form.Item.useStatus()
  console.log({ status, value })

  return <InputNumber value={value} />
}
const CustomButton = ({
  additionalParameter,
  children,
  onClick,
}: {
  additionalParameter: number
  children: ReactNode
  onClick: (e: MouseEvent, additionalParameter: number) => void
}) => {
  const onInnerClick = useCallback(
    (e: MouseEvent) => {
      onClick(e, additionalParameter)
    },
    [additionalParameter]
  )

  return <Button onClick={onInnerClick}>{children}</Button>
}

export const FormDemo = () => {
  const [form] = useForm<FormModel>()
  const name = useWatch('name', form)
  console.log({ name })
  const onChange = useCallback((e: MouseEvent, num: number) => {
    // const prevAge = form.getFieldValue('age') || 0
    // form.setFieldsValue({ age: prevAge + 1 })
    console.log(e, num)
  }, [])

  const onFinish = (values: FormModel) => {
    console.log(values)
  }

  const onReset = () => {
    form.resetFields()
  }
  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="age"
        label="age"
      >
        <CustomInput />
      </Form.Item>
      <Form.Item>
        {[1, 2, 3, 4, 5, 6].map((num) => {
          return (
            <CustomButton
              key={num}
              onClick={onChange}
              additionalParameter={num}
            >
              change {num}
            </CustomButton>
          )
        })}
        <br />
        <Button
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
        <Button
          htmlType="button"
          onClick={onReset}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  )
}
