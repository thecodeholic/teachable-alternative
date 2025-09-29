<?php

namespace App\Filament\Resources\LessonVideos\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class LessonVideoForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Video Information')
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

                Section::make('Video File')
                    ->schema([
                        FileUpload::make('file_path')
                            ->label('Video File')
                            ->acceptedFileTypes(['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'])
                            ->directory('lesson-videos')
                            ->visibility('private')
                            ->maxSize(102400) // 100MB
                            ->required()
                            ->reactive()
                            ->afterStateUpdated(function ($state, callable $set) {
                                if ($state) {
                                    $set('file_name', basename($state));
                                    $set('mime_type', 'video/mp4'); // You might want to detect this properly
                                }
                            }),
                        TextInput::make('duration')
                            ->label('Duration (seconds)')
                            ->numeric()
                            ->helperText('Enter video duration in seconds'),
                    ])
                    ->columns(2),
            ]);
    }
}
