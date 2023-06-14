import { ConfigurableModuleBuilder } from '@nestjs/common';
import { MidtransConfig } from './dto/Config';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<MidtransConfig>()
        .setExtras(
            {
                isGlobal: false,
            },
            (definition, extras) => ({
                ...definition,
                global: extras.isGlobal,
            }),
        )
        .build();