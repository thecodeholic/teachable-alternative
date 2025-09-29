<?php

namespace App\Filament\Resources\Courses\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CourseForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Course Information')
                    ->schema([
                        TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, callable $set) {
                                if ($state) {
                                    $set('slug', \Illuminate\Support\Str::slug($state));
                                }
                            }),
                        TextInput::make('slug')
                            ->label('URL Slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('This will be used in the course URL'),
                        Textarea::make('subtitle')
                            ->rows(3)
                            ->columnSpanFull(),
                        Textarea::make('description')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Section::make('Media & Pricing')
                    ->schema([
                        FileUpload::make('thumbnail')
                            ->image()
                            ->directory('course-thumbnails')
                            ->visibility('public')
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->columnSpanFull(),
                        TextInput::make('price')
                            ->numeric()
                            ->prefix('$')
                            ->step(0.01)
                            ->minValue(0)
                            ->columnSpanFull(),
                    ])
                    ->columns(1),

                Section::make('Settings')
                    ->schema([
                        Toggle::make('published')
                            ->default(false),
                    ])
                    ->columns(1),
            ]);
    }
}
