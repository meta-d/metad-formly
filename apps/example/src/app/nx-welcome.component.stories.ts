import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MetadFormlyMatModule } from '@metad/formly-mat';
import { C_FORMLY_INITIAL_VALUE } from '@metad/formly-mat/expansion';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatToggleModule } from '@ngx-formly/material/toggle';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { NxWelcomeComponent } from './nx-welcome.component';

export default {
  title: 'WelcomeComponent',
  component: NxWelcomeComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormlyModule.forRoot(),
        MetadFormlyMatModule,
        FormlyMaterialModule,
        FormlyMatToggleModule
      ],
    }),
  ],
} as Meta<NxWelcomeComponent>;

const Template: Story<NxWelcomeComponent> = (args: NxWelcomeComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  schema: [
    {
      // key: 'values',
      type: 'tabs',
      templateOptions: {
        label: 'Tabs Group',
        disableRipple: true
      },
      fieldGroup: [
        {
          key: 'builder',
          templateOptions: {
            label: 'Builder',
            icon: 'handyman'
          },
          fieldGroup: [
            {
              key: 'dataSettings',
              wrappers: ['expansion'],
              templateOptions: {
                label: 'Data Settings',
                expanded: true
              },
              fieldGroupClassName: 'metad-formly__row',
              fieldGroup: [
                {
                  className: 'metad-formly__col col-6',
                  key: 'dataSource',
                  type: 'select',
                  templateOptions: {
                    label: 'Data Source',
                    appearance: 'outline',
                    options: [
                      {value: '1', label: 'MySQL'},
                      {value: '2', label: 'Hive'},
                      {value: '3', label: 'Doris'},
                    ]
                  },
                },
                {
                  className: 'metad-formly__col col-6',
                  key: 'entity',
                  type: 'select',
                  templateOptions: {
                    label: 'Entity',
                    appearance: 'outline',
                    options: [
                      {value: 'sales', label: 'Sales'},
                      {value: 'customers', label: 'Customers'},
                      {value: 'products', label: 'Products'},
                    ]
                  },
                }
              ]
            },
            {
              key: 'options',
              wrappers: ['expansion'],
              defaultValue: C_FORMLY_INITIAL_VALUE,
              templateOptions: {
                label: 'Options',
                toggleable: true,
              },
              fieldGroupClassName: 'metad-formly__row',
              fieldGroup: [
                {
                  className: 'metad-formly__col col-6',
                  key: 'show',
                  type: 'toggle',
                  templateOptions: {
                    label: 'Is Show'
                  }
                },
                {
                  hideExpression: `!model || !model.show`,
                  className: 'metad-formly__col col-6',
                  key: 'type',
                  type: 'select',
                  templateOptions: {
                    label: 'Type',
                    placeholder: 'please select a type',
                    options: [
                      {value: 'card', label: 'Card'},
                      {value: 'filter', label: 'Filter'}
                    ]
                  }
                }
              ]
            }
          ]
        },
        {
          key: 'styling',
          templateOptions: {
            label: 'Styling',
            icon: 'format_paint'
          },
          fieldGroup: [
            {
              wrappers: ['panel'],
              key: 'widget',

              fieldGroupClassName: 'metad-formly__row',
              templateOptions: {
                label: 'Widget Style',
                padding: true
              },
              fieldGroup: [
                ...Background(4)
              ]
            },
            {
              key: 'varients',
              type: 'array-tabs',
              templateOptions: {
                label: 'Varients',
                labelField: 'name',
                removeLabel: 'Remove Current Varient'
              },
              fieldArray: {
                fieldGroupClassName: 'metad-formly__row',
                fieldGroup: [
                  {
                    className: 'metad-formly__col col-4',
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                      label: 'Name'
                    }
                  },
                  ...Background(4)
                ]
              }
            }
          ]
        },
      ],
    }
  ],
};


function Background(col?: number) {
  let className = null
  if (col) {
    className = `metad-formly__col col-${col}`
  }

  return [
    {
      className,
      key: 'background-color',
      type: 'color',
      templateOptions: {
        label: 'Background Color'
      }
    },
    {
      className,
      key: 'background',
      type: 'input',
      templateOptions: { label: 'Background' }
    },
    {
      className,
      key: 'background-size',
      type: 'input',
      templateOptions: {
        label: 'Background Size'
      }
    },
    {
      className,
      key: 'background-repeat',
      type: 'input',
      templateOptions: {
        label: 'Background Repeat',
        options: [
          {
            value: 'no-repeat',
            label: 'No Repeat'
          }
        ]
      }
    },
    {
      className,
      key: 'backdrop-filter',
      type: 'input',
      templateOptions: {
        label: 'Backdrop Filter'
      }
    }
  ]
}