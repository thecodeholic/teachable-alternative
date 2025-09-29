<?php

namespace App\Filament\Resources\LessonVideos\Pages;

use App\Filament\Resources\LessonVideos\LessonVideoResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditLessonVideo extends EditRecord
{
    protected static string $resource = LessonVideoResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
