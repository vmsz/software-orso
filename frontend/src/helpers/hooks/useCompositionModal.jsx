import { create } from 'zustand'

const useCompositionModal = create(set => ({
  modalOpen: false,
  setModalOpen: open =>
    set({
      modalOpen: open,
    }),

  compositionTab: '',
  setCompositionTab: compositionTab =>
    set({
      compositionTab: compositionTab,
    }),

  compositionRow: null,
  setCompositionRow: compositionRow =>
    set({
      compositionRow: compositionRow,
    }),

  code: '',
  setCode: code =>
    set({
      code: code,
    }),

  description: '',
  setDescription: description =>
    set({
      description: description,
    }),

  unity: '',
  setUnity: unity =>
    set({
      unity: unity,
    }),

  additionalInfo: '',
  setAdditionalInfo: additionalInfo =>
    set({
      additionalInfo: additionalInfo,
    }),

  initialInputs: [],
  setInitialInputs: initialInputs =>
    set({
      initialInputs: initialInputs,
    }),

  inputs: [],
  setInputs: inputs =>
    set({
      inputs: inputs,
    }),
}))

export { useCompositionModal }
