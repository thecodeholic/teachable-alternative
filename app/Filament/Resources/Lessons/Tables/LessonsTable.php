<?php

namespace App\Filament\Resources\Lessons\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class LessonsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('sort_order')
                    ->label('#')
                    ->numeric()
                    ->sortable()
                    ->width('60px'),
                TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                TextColumn::make('content')
                    ->limit(50)
                    ->tooltip(function (TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= $column->getCharacterLimit()) {
                            return null;
                        }
                        return $state;
                    }),
                TextColumn::make('module.title')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('info'),
                TextColumn::make('module.course.title')
                    ->searchable()
                    ->sortable()
                    ->badge()
                    ->color('success'),
                TextColumn::make('videos_count')
                    ->counts('videos')
                    ->badge()
                    ->color('warning'),
                TextColumn::make('attachments_count')
                    ->counts('attachments')
                    ->badge()
                    ->color('gray'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('module_id')
                    ->relationship('module', 'title')
                    ->searchable()
                    ->preload(),
                SelectFilter::make('course_id')
                    ->relationship('module.course', 'title')
                    ->searchable()
                    ->preload(),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('move_up')
                    ->icon('heroicon-o-arrow-up')
                    ->action(function ($record) {
                        $record->decrement('sort_order');
                    })
                    ->visible(fn ($record) => $record->sort_order > 0),
                Action::make('move_down')
                    ->icon('heroicon-o-arrow-down')
                    ->action(function ($record) {
                        $record->increment('sort_order');
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order', 'asc')
            ->reorderable('sort_order');
    }
}
