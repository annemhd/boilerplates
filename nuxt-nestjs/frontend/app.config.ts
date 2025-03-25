export default defineAppConfig({
  ui: {
    formField: {
      slots: {
        root: 'flex justify-between items-center',
        wrapper: '',
        labelWrapper: 'flex content-center items-center justify-between w-full' ,
        label: ' block font-medium text-(--ui-text)',
        container: 'mt-1 relative basis-1/2',
        description: 'text-(--ui-text-muted)',
        error: 'mt-2 text-(--ui-error)',
        hint: 'text-(--ui-text-muted)',
        help: 'mt-2 text-(--ui-text-muted)'
      },
      variants: {
        size: {
          xs: {
            root: 'text-xs'
          },
          sm: {
            root: 'text-xs'
          },
          md: {
            root: 'text-sm'
          },
          lg: {
            root: 'text-sm'
          },
          xl: {
            root: 'text-base'
          }
        },
        required: {
          true: {
            label: "after:content-['*'] after:ms-0.5 after:text-(--ui-error)"
          }
        }
      },
      defaultVariants: {
        size: 'md'
      }
    }
  }
})


