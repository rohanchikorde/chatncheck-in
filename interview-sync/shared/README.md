# InterviewSync Shared

Shared utilities, types, and configurations for the InterviewSync platform.

## Purpose

This module contains shared code that is used by both the frontend and backend applications. It includes:

- Common TypeScript types and interfaces
- Shared utilities and helper functions
- Configuration files
- Shared constants and enums

## Structure

```
shared/
├── types/     # Shared TypeScript types and interfaces
├── utils/     # Shared utility functions
├── config/    # Shared configuration files
└── constants/ # Shared constants and enums
```

## Usage

### TypeScript Types

All shared TypeScript types are located in the `types` directory. These types are used to ensure type safety across both the frontend and backend.

### Utilities

Shared utility functions are located in the `utils` directory. These functions handle common operations that are needed by both applications.

### Configuration

Shared configuration files are located in the `config` directory. These files contain settings that are used by both applications.

### Constants

Shared constants and enums are located in the `constants` directory. These values are used consistently across both applications.

## Development

The shared module is built with TypeScript and follows the same coding standards as the rest of the project. When making changes to shared code, ensure that:

1. The changes are backward compatible
2. All types are properly exported
3. Documentation is updated
4. Tests are added if applicable

## Integration

To use the shared module in your application:

1. Install the shared package as a dependency
2. Import the necessary types, utilities, or configurations
3. Follow the TypeScript type definitions for proper usage
