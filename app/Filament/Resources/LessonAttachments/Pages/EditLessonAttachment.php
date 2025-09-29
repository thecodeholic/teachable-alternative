<?php

namespace App\Filament\Resources\LessonAttachments\Pages;

use App\Filament\Resources\LessonAttachments\LessonAttachmentResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditLessonAttachment extends EditRecord
{
    protected static string $resource = LessonAttachmentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
