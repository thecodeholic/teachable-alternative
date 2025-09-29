<?php

namespace App\Filament\Resources\LessonAttachments\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class LessonAttachmentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Attachment Information')
                    ->schema([
                        Select::make('lesson_id')
                            ->relationship('lesson', 'title')
                            ->required()
                            ->searchable()
                            ->preload(),
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                    ])
                    ->columns(2),

                Section::make('File Upload')
                    ->schema([
                        FileUpload::make('file_path')
                            ->label('File')
                            ->directory('lesson-attachments')
                            ->visibility('private')
                            ->maxSize(10240) // 10MB
                            ->required()
                            ->reactive()
                            ->afterStateUpdated(function ($state, callable $set) {
                                if ($state) {
                                    $set('file_name', basename($state));
                                    // You might want to detect MIME type properly
                                    $set('mime_type', 'application/octet-stream');
                                }
                            }),
                    ])
                    ->columns(1),
            ]);
    }
}
