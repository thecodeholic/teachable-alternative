<?php

namespace App\Filament\Resources\Lessons\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Schema;

class LessonForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Lesson Information')
                    ->schema([
                        Select::make('module_id')
                            ->relationship('module', 'title')
                            ->required()
                            ->searchable()
                            ->preload()
                            ->reactive()
                            ->afterStateUpdated(function ($state, callable $set) {
                                // Auto-set sort order to next available number
                                if ($state) {
                                    $maxOrder = \App\Models\Lesson::where('module_id', $state)->max('sort_order') ?? 0;
                                    $set('sort_order', $maxOrder + 1);
                                }
                            }),
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255),
                        RichEditor::make('content')
                            ->label('Lesson Content')
                            ->placeholder('Enter lesson content...')
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'link',
                                'bulletList',
                                'orderedList',
                                'h2',
                                'h3',
                                'blockquote',
                                'codeBlock',
                            ])
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Ordering')
                    ->schema([
                        TextInput::make('sort_order')
                            ->numeric()
                            ->default(0)
                            ->helperText('Lower numbers appear first. Leave empty to add to the end.'),
                    ])
                    ->collapsible(),

                Section::make('Videos')
                    ->schema([
                        Repeater::make('videos')
                            ->relationship('videos')
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255),
                                FileUpload::make('file_path')
                                    ->label('Video File')
                                    ->acceptedFileTypes(['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'])
                                    ->directory('lesson-videos')
                                    ->visibility('private')
                                    ->maxSize(102400) // 100MB
                                    ->required(),
                                TextInput::make('duration')
                                    ->label('Duration (seconds)')
                                    ->numeric()
                                    ->helperText('Enter video duration in seconds'),
                            ])
                            ->columns(2)
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null),
                    ])
                    ->collapsible(),

                Section::make('Attachments')
                    ->schema([
                        Repeater::make('attachments')
                            ->relationship('attachments')
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255),
                                FileUpload::make('file_path')
                                    ->label('File')
                                    ->directory('lesson-attachments')
                                    ->visibility('private')
                                    ->maxSize(10240) // 10MB
                                    ->required(),
                            ])
                            ->columns(2)
                            ->collapsible()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null),
                    ])
                    ->collapsible(),
            ]);
    }
}
