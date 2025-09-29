<?php

namespace App\Filament\Resources\LessonVideos;

use App\Filament\Resources\LessonVideos\Pages\CreateLessonVideo;
use App\Filament\Resources\LessonVideos\Pages\EditLessonVideo;
use App\Filament\Resources\LessonVideos\Pages\ListLessonVideos;
use App\Filament\Resources\LessonVideos\Schemas\LessonVideoForm;
use App\Filament\Resources\LessonVideos\Tables\LessonVideosTable;
use App\Models\LessonVideo;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use UnitEnum;

class LessonVideoResource extends Resource
{
    protected static ?string $model = LessonVideo::class;

    protected static BackedEnum|string|null $navigationIcon = 'heroicon-o-video-camera';

    protected static UnitEnum|string|null $navigationGroup = 'Course Management';

    protected static ?int $navigationSort = 4;

    public static function form(Schema $schema): Schema
    {
        return LessonVideoForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LessonVideosTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListLessonVideos::route('/'),
            'create' => CreateLessonVideo::route('/create'),
            'edit' => EditLessonVideo::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes()
            ->with(['lesson.module.course']);
    }
}
