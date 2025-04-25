'use client';

import {
  Badge,
  createListCollection,
  Field,
  Fieldset,
  HStack,
  Input,
  Portal,
  Select,
} from '@chakra-ui/react';
import { RefObject } from 'react';
import { useHookFormMask } from 'use-mask-input';
import { Brasil } from './states';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { Inputs } from './new-contact.schema';

interface NewContactFormProps {
  dialogRef: RefObject<HTMLDivElement | null>;
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  control: Control<Inputs>;
}

export default function NewContactForm({
  dialogRef,
  register,
  errors,
  control,
}: NewContactFormProps) {
  const states = createListCollection({
    items: Brasil.states,
  });
  const registerWithMask = useHookFormMask(register);

  return (
    <Fieldset.Root
      as={'form'}
      size={'lg'}
      maxW={'md'}
      invalid={Object.getOwnPropertyNames(errors).length > 0}
    >
      <Fieldset.Content>
        <Field.Root invalid={!!errors.name} required>
          <Field.Label>
            Name
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            {...register('name', {
              required: true,
              maxLength: 100,
              minLength: 3,
            })}
          />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.phone} required>
          <Field.Label>
            Phone
            <Field.RequiredIndicator />
          </Field.Label>
          <Input
            {...registerWithMask('phone', ['(99) 99999-9999'], {
              required: true,
            })}
            placeholder="(99) 99999-9999"
          />
          <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root required>
          <Field.Label>
            State
            <Field.RequiredIndicator />
          </Field.Label>
          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <Select.Root
                name={field.name}
                value={field.value}
                onValueChange={({ value }) => field.onChange(value)}
                onInteractOutside={() => field.onBlur()}
                collection={states}
                size={'sm'}
                w={'full'}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select state" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal container={dialogRef}>
                  <Select.Positioner>
                    <Select.Content>
                      {states.items.map((state) => (
                        <Select.Item item={state} key={state.value}>
                          <HStack gap={2}>
                            <Badge>{state.value.toUpperCase()}</Badge>
                            <Select.ItemText>{state.label}</Select.ItemText>
                          </HStack>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            )}
          />
          <Field.ErrorText>
            {errors.state?.message}
          </Field.ErrorText>
        </Field.Root>
      </Fieldset.Content>
      <Fieldset.ErrorText>
        Some fields are invalid. Please check them.
      </Fieldset.ErrorText>
    </Fieldset.Root>
  );
}
