<?php

namespace App\Filament\Resources\LessonAttachments\Pages;

use App\Filament\Resources\LessonAttachments\LessonAttachmentResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListLessonAttachments extends ListRecords
{
    protected static string $resource = LessonAttachmentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
