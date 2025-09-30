<?php

namespace App\Filament\Resources\Courses\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Actions\Action;
use Filament\Actions\ViewAction;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CourseForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
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
                        MarkdownEditor::make('description')
                            ->columnSpanFull(),
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
                            ->required()
                            ->columnSpanFull(),

                        Toggle::make('published')
                            ->default(false),
                    ])
                    ->columns(2)
                    ->columnSpanFull(),

                Section::make('Course Modules')
                    ->schema([
                        Repeater::make('modules')
                            ->relationship('modules')
                            ->hiddenLabel()
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->columnSpanFull()
                                    ->hiddenLabel()
                                    ->placeholder('Module title'),

                                TextInput::make('sort_order')
                                    ->numeric()
                                    ->default(0)
                                    ->hidden()
                                    ->dehydrated(),

                                Repeater::make('lessons')
                                    ->relationship('lessons')
                                    ->schema([
                                        TextInput::make('title')
                                            ->required(false)
                                            ->maxLength(255)
                                            ->columnSpanFull()
                                            ->live(onBlur: true)
                                            ->placeholder('Enter lesson title'),

                                        TextInput::make('sort_order')
                                            ->numeric()
                                            ->default(0)
                                            ->hidden()
                                            ->dehydrated(),
                                    ])
                                    ->columns(1)
                                    ->itemLabel(fn(array $state): ?string => $state['title'] ?? 'New Lesson')
                                    ->addActionLabel('Add Lesson')
                                    ->orderColumn('sort_order')
                                    ->reorderable()
                                    ->collapsible()
                                    ->collapsed(true)
                                    ->cloneable()
                                    ->deletable(true)
                                    ->minItems(0)
                                    ->maxItems(100)
                                    ->extraItemActions([
                                        Action::make('edit_lesson')
                                            ->icon('heroicon-o-pencil')
                                            ->label('Edit Lesson')
                                            ->url(function (array $arguments, Repeater $component): string {
                                                $itemData = $component->getItemState($arguments['item']);
                                                return \App\Filament\Resources\Lessons\LessonResource::getUrl('edit', ['record' => $itemData['id'] ?? 1]);
                                            })
                                            ->openUrlInNewTab(false),
                                    ]),
                            ])
                            ->columns(1)
                            ->itemLabel(fn(array $state): ?string => $state['title'] ?? 'New Module')
                            ->addActionLabel('Add Module')
                            ->orderColumn('sort_order')
                            ->reorderable()
                            ->collapsible()
                            ->collapsed(false)
                            ->cloneable()
                            ->deletable(true)
                            ->columnSpanFull()
                            ->defaultItems(0)
                            ->minItems(0)
                            ->maxItems(50),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
