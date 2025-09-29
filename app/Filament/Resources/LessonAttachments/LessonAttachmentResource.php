<?php

namespace App\Filament\Resources\LessonAttachments;

use App\Filament\Resources\LessonAttachments\Pages\CreateLessonAttachment;
use App\Filament\Resources\LessonAttachments\Pages\EditLessonAttachment;
use App\Filament\Resources\LessonAttachments\Pages\ListLessonAttachments;
use App\Filament\Resources\LessonAttachments\Schemas\LessonAttachmentForm;
use App\Filament\Resources\LessonAttachments\Tables\LessonAttachmentsTable;
use App\Models\LessonAttachment;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use UnitEnum;

class LessonAttachmentResource extends Resource
{
    protected static ?string $model = LessonAttachment::class;

    protected static BackedEnum|string|null $navigationIcon = 'heroicon-o-paper-clip';

    protected static UnitEnum|string|null $navigationGroup = 'Course Management';

    protected static ?int $navigationSort = 5;

    public static function form(Schema $schema): Schema
    {
        return LessonAttachmentForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return LessonAttachmentsTable::configure($table);
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
            'index' => ListLessonAttachments::route('/'),
            'create' => CreateLessonAttachment::route('/create'),
            'edit' => EditLessonAttachment::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes()
            ->with(['lesson.module.course']);
    }
}
